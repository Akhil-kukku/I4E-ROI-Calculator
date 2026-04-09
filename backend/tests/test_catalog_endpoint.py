from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_catalog_options_and_dependent_filters() -> None:
    options_response = client.get("/catalog/options")
    assert options_response.status_code == 200
    options = options_response.json()

    assert "USA" in options["countries"]
    assert "Engineering & Technology" in options["streams"]
    assert "UG" in options["levels"]

    country_response = client.get("/catalog/options", params={"country": "Australia"})
    assert country_response.status_code == 200
    country_options = country_response.json()
    assert country_options["countries"] == ["Australia"]
    assert country_options["streams"] == ["Engineering & Technology"]
    assert country_options["levels"] == ["UG"]

    stream_response = client.get(
        "/catalog/options",
        params={"country": "Australia", "stream": "Engineering & Technology"},
    )
    assert stream_response.status_code == 200
    stream_options = stream_response.json()
    assert stream_options["levels"] == ["UG"]

    colleges_response = client.get(
        "/catalog/colleges",
        params={"country": "USA", "stream": "Engineering & Technology", "level": "UG"},
    )
    assert colleges_response.status_code == 200
    colleges = colleges_response.json()["colleges"]
    assert "Massachusetts Institute of Technology (MIT)" in colleges

    courses_response = client.get(
        "/catalog/courses",
        params={
            "country": "USA",
            "stream": "Engineering & Technology",
            "level": "UG",
            "college_name": "Massachusetts Institute of Technology (MIT)",
        },
    )
    assert courses_response.status_code == 200
    assert len(courses_response.json()["courses"]) > 0
