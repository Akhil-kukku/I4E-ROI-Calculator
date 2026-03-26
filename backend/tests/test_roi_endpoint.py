from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_post_roi_success() -> None:
    payload = {
        "country": "USA",
        "stream": "Engineering & Technology",
        "level": "UG",
        "college_name": "Massachusetts Institute of Technology (MIT)",
        "course_name": "Aerospace Engineering; Chemical Engineering; Civil Engineering; Computer Science & Engineering (EECS); Electrical Engineering; Environmental Engineering; Materials Science & Engineering; Mechanical Engineering; Nuclear Science & Engineering; Ocean Engineering; Biological Engineering",
        "target_year": 2031,
        "current_savings": 5000,
        "show_living_cost": True,
        "expected_return_rate": 12,
        "scholarship_percent": 10,
    }

    response = client.post("/roi", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "current_cost" in data
    assert "future_cost" in data
    assert "monthly_sip_required" in data
    assert "roi_percent" in data
