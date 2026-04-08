from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Education ROI API"
    app_env: str = "development"
    frontend_origin: str = "http://localhost:3000"
    frontend_origins: str = "https://akhil-kukku.github.io"

    @property
    def cors_origins(self) -> list[str]:
        # Supports both FRONTEND_ORIGIN and comma-separated FRONTEND_ORIGINS.
        configured = [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]
        if self.frontend_origin.strip():
            configured.append(self.frontend_origin.strip())
        return sorted(set(configured))

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
