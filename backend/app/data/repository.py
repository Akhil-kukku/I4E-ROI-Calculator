from __future__ import annotations

import csv
import os
from pathlib import Path
from typing import Any

DATASET_FILENAME = "final_roi_dataset_v2.csv"


def _resolve_dataset_path() -> Path:
    env_path = os.getenv("DATASET_PATH", "").strip()
    if env_path:
        return Path(env_path).expanduser().resolve()

    app_root = Path(__file__).resolve().parents[2]
    repo_root = Path(__file__).resolve().parents[3]
    candidates = [
        app_root / "data" / DATASET_FILENAME,
        repo_root / "data" / DATASET_FILENAME,
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate

    # Keep previous default behavior for explicit error reporting.
    return app_root / "data" / DATASET_FILENAME


DATASET_PATH = _resolve_dataset_path()


def _to_float(raw: str) -> float:
    try:
        return float(raw)
    except (TypeError, ValueError):
        return 0.0


def _ranking_key(raw: str) -> int:
    cleaned = (raw or "").strip()
    if not cleaned:
        return 999999
    first_token = cleaned.split("-")[0]
    try:
        return int(first_token)
    except ValueError:
        return 999999


def load_records() -> list[dict[str, Any]]:
    if not DATASET_PATH.exists():
        raise FileNotFoundError(f"Dataset not found: {DATASET_PATH}")

    records: list[dict[str, Any]] = []
    with DATASET_PATH.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            records.append(
                {
                    "country": (row.get("country") or "").strip(),
                    "stream": (row.get("stream") or "").strip(),
                    "level": (row.get("level") or "").strip().upper(),
                    "course_name": (row.get("course_name") or "").strip(),
                    "college_name": (row.get("college_name") or "").strip(),
                    "ranking": (row.get("ranking") or "").strip(),
                    "duration_years": _to_float(row.get("duration_years", "0")),
                    "total_cost_local": _to_float(row.get("total_cost_local", "0")),
                    "total_cost_inr": _to_float(row.get("total_cost_inr", "0")),
                    "avg_salary_local": _to_float(row.get("avg_salary_local", "0")),
                    "avg_salary_inr": _to_float(row.get("avg_salary_inr", "0")),
                    "roi": _to_float(row.get("roi", "0")),
                    "payback_years": _to_float(row.get("payback_years", "0")),
                }
            )

    return records


RECORDS = load_records()


def get_filter_options() -> dict[str, list[str]]:
    countries = sorted({r["country"] for r in RECORDS if r["country"]})
    streams = sorted({r["stream"] for r in RECORDS if r["stream"]})
    levels = sorted({r["level"] for r in RECORDS if r["level"]})
    return {"countries": countries, "streams": streams, "levels": levels}


def get_colleges(country: str, stream: str, level: str) -> list[str]:
    scoped = [
        r["college_name"]
        for r in RECORDS
        if r["country"] == country and r["stream"] == stream and r["level"] == level
    ]
    return sorted({name for name in scoped if name})


def get_courses(country: str, stream: str, level: str, college_name: str) -> list[str]:
    scoped = [
        r["course_name"]
        for r in RECORDS
        if r["country"] == country
        and r["stream"] == stream
        and r["level"] == level
        and r["college_name"] == college_name
    ]
    return sorted({name for name in scoped if name})


def find_record(
    country: str,
    stream: str,
    level: str,
    college_name: str | None,
    course_name: str | None,
) -> dict[str, Any] | None:
    scoped = [
        r
        for r in RECORDS
        if r["country"] == country and r["stream"] == stream and r["level"] == level
    ]
    if college_name:
        scoped = [r for r in scoped if r["college_name"] == college_name]
    if course_name:
        scoped = [r for r in scoped if r["course_name"] == course_name]

    if not scoped:
        return None

    scoped.sort(key=lambda row: _ranking_key(row["ranking"]))
    return scoped[0]
