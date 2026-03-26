from fastapi import APIRouter

from app.models.roi import RoiRequest, RoiResponse
from app.services.roi_service import calculate_roi

router = APIRouter(prefix="/roi", tags=["ROI"])


@router.post("", response_model=RoiResponse)
def post_roi(payload: RoiRequest) -> RoiResponse:
    return calculate_roi(payload)
