from datetime import datetime

from fastapi import HTTPException, status

from app.data.repository import find_record
from app.models.roi import CostBreakdown, RoiRequest, RoiResponse


def _round_money(value: float) -> float:
    return round(value, 2)


def _safe_divide(dividend: float, divisor: float) -> float:
    if divisor == 0:
        return 0.0
    return dividend / divisor


def calculate_roi(payload: RoiRequest) -> RoiResponse:
    current_year = datetime.now().year
    years_to_start = payload.target_year - current_year
    if years_to_start < 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="target_year must be greater than or equal to current year",
        )

    data = find_record(
        country=payload.country,
        stream=payload.stream,
        level=payload.level,
        college_name=payload.college_name,
        course_name=payload.course_name,
    )
    if not data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No matching record found for selected country/stream/level/college/course",
        )

    duration = int(round(float(data["duration_years"])))
    duration = duration if duration > 0 else (4 if payload.level == "UG" else 2)
    total_cost_inr = float(data["total_cost_inr"])
    avg_salary_inr = float(data["avg_salary_inr"])

    tuition = _safe_divide(total_cost_inr, duration)
    living = 0.0
    edu_inflation = payload.inflation_override if payload.inflation_override is not None else 0.08
    living_inflation = payload.inflation_override if payload.inflation_override is not None else 0.06
    months = years_to_start * 12

    annual_living_component = living if payload.show_living_cost else 0.0

    total_education = tuition * duration
    total_living = annual_living_component * duration
    current_cost = total_education + total_living

    inflated_tuition = tuition * (1 + edu_inflation) ** years_to_start
    inflated_living = annual_living_component * (1 + living_inflation) ** years_to_start

    future_education = inflated_tuition * duration
    future_living = inflated_living * duration
    total_future_cost = future_education + future_living

    net_cost = total_future_cost * (1 - payload.scholarship_percent / 100)

    monthly_return = (payload.expected_return_rate / 100) / 12
    fv_goal = max(net_cost - payload.current_savings, 0.0)

    if months == 0:
        monthly_sip = fv_goal
    elif monthly_return == 0:
        monthly_sip = fv_goal / months
    else:
        growth_factor = (1 + monthly_return) ** months - 1
        monthly_sip = _safe_divide(fv_goal * monthly_return, growth_factor)

    sip_for_projection = payload.monthly_investment if payload.monthly_investment is not None else monthly_sip
    if months == 0:
        future_value = payload.current_savings + sip_for_projection
    elif monthly_return == 0:
        future_value = sip_for_projection * months + payload.current_savings
    else:
        fv_sip = sip_for_projection * (((1 + monthly_return) ** months - 1) / monthly_return)
        fv_savings = payload.current_savings * (1 + monthly_return) ** months
        future_value = fv_sip + fv_savings

    salary_multiplier = 1.5
    salary_growth = 0.05
    annual_salary = avg_salary_inr if avg_salary_inr > 0 else inflated_tuition * salary_multiplier
    total_earnings_5yr = 0.0
    for year in range(1, 6):
        total_earnings_5yr += annual_salary * ((1 + salary_growth) ** (year - 1))

    roi_percent = _safe_divide(total_earnings_5yr - net_cost, net_cost) * 100 if net_cost > 0 else 0.0
    payback_years = _safe_divide(net_cost, annual_salary)

    return RoiResponse(
        country=payload.country,
        stream=payload.stream,
        level=payload.level,
        college_name=payload.college_name,
        course_name=payload.course_name,
        ranking=str(data.get("ranking", "")),
        current_cost=_round_money(current_cost),
        future_cost=_round_money(total_future_cost),
        net_cost=_round_money(net_cost),
        monthly_sip_required=_round_money(monthly_sip),
        future_value_if_investing=_round_money(future_value),
        roi_percent=round(roi_percent, 2),
        total_earnings_5yr=_round_money(total_earnings_5yr),
        payback_years=round(payback_years, 2),
        dataset_roi=round(float(data.get("roi", 0.0)) * 100, 2),
        dataset_payback_years=round(float(data.get("payback_years", 0.0)), 2),
        breakdown=CostBreakdown(
            tuition=_round_money(tuition),
            living=_round_money(annual_living_component),
            duration=duration,
            inflation={
                "education": round(edu_inflation, 4),
                "living": round(living_inflation, 4),
            },
        ),
    )
