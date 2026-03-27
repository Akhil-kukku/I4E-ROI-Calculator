from pydantic import BaseModel, Field, field_validator


class RoiRequest(BaseModel):
    country: str = Field(min_length=2)
    stream: str = Field(min_length=2)
    level: str
    college_name: str = Field(min_length=2)
    course_name: str = Field(min_length=2)
    target_year: int = Field(ge=2000, le=2100)
    monthly_investment: float | None = Field(default=None, ge=0)
    current_savings: float = Field(default=0, ge=0)
    show_living_cost: bool = True
    expected_return_rate: float = Field(default=12.0, ge=0, le=100)
    inflation_override: float | None = Field(default=None, ge=0, le=1)
    scholarship_percent: float = Field(default=0, ge=0, le=100)
    loan_interest_rate: float | None = Field(default=None, ge=0)

    @field_validator("level")
    @classmethod
    def validate_level(cls, value: str) -> str:
        norm = value.upper()
        if norm not in {"UG", "PG"}:
            raise ValueError("level must be UG or PG")
        return norm


class CostBreakdown(BaseModel):
    tuition: float
    living: float
    duration: int
    inflation: dict[str, float]


class RoiResponse(BaseModel):
    country: str
    stream: str
    level: str
    college_name: str
    course_name: str
    ranking: str
    current_cost: float
    future_cost: float
    net_cost: float
    monthly_sip_required: float
    future_value_if_investing: float
    roi_percent: float
    total_earnings_5yr: float
    payback_years: float
    dataset_roi: float
    dataset_payback_years: float
    breakdown: CostBreakdown
