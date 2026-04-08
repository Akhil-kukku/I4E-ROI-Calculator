from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

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


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/docs", status_code=status.HTTP_307_TEMPORARY_REDIRECT)


@app.head("/", include_in_schema=False)
def root_head() -> Response:
    return Response(status_code=status.HTTP_200_OK)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(roi_router)
app.include_router(catalog_router)
