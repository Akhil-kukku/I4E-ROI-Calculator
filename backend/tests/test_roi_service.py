from app.models.roi import RoiRequest
from app.services.roi_service import calculate_roi


def test_calculate_roi_basic_result_shape() -> None:
    payload = RoiRequest(
        country="USA",
        stream="Engineering & Technology",
        level="UG",
        college_name="Massachusetts Institute of Technology (MIT)",
        course_name="Aerospace Engineering; Chemical Engineering; Civil Engineering; Computer Science & Engineering (EECS); Electrical Engineering; Environmental Engineering; Materials Science & Engineering; Mechanical Engineering; Nuclear Science & Engineering; Ocean Engineering; Biological Engineering",
        target_year=2031,
        current_savings=1000,
        show_living_cost=True,
    )

    result = calculate_roi(payload)

    assert result.current_cost > 0
    assert result.future_cost >= result.current_cost
    assert result.monthly_sip_required >= 0
    assert result.payback_years > 0
