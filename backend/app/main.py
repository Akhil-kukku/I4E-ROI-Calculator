from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.catalog import router as catalog_router
from app.api.routes.roi import router as roi_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Education ROI API", "docs": "/docs", "health": "/health"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(roi_router)
app.include_router(catalog_router)
