from fastapi import APIRouter, Query

from app.data.repository import get_colleges, get_courses, get_filter_options

router = APIRouter(prefix="/catalog", tags=["Catalog"])


@router.get("/options")
def catalog_options() -> dict[str, list[str]]:
    return get_filter_options()


@router.get("/colleges")
def catalog_colleges(
    country: str = Query(..., min_length=2),
    stream: str = Query(..., min_length=2),
    level: str = Query(..., min_length=2),
) -> dict[str, list[str]]:
    return {"colleges": get_colleges(country=country, stream=stream, level=level.upper())}


@router.get("/courses")
def catalog_courses(
    country: str = Query(..., min_length=2),
    stream: str = Query(..., min_length=2),
    level: str = Query(..., min_length=2),
    college_name: str = Query(..., min_length=2),
) -> dict[str, list[str]]:
    return {
        "courses": get_courses(
            country=country,
            stream=stream,
            level=level.upper(),
            college_name=college_name,
        )
    }
