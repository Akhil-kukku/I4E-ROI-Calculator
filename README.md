# Education ROI Calculator (Full Stack)

I4E ROI calculator with a frontend and backend.

## Stack

- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Axios
- Backend: Python FastAPI (in-memory JSON data, no DB)

## Project Structure

- frontend/
- backend/

## Run Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Run Backend

1. `cd backend`
2. Create/activate a Python virtual environment
3. `pip install -e .`
4. `uvicorn app.main:app --reload --port 8000`
5. API docs: `http://localhost:8000/docs`

## Environment Variables

Frontend (`frontend/.env.local`):

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`

Backend (`backend/.env`):

- `APP_NAME=Education ROI API`
- `APP_ENV=development`
- `FRONTEND_ORIGIN=http://localhost:3000`

## API

- `POST /roi`
- `GET /health`
- `GET /catalog/options?country=&stream=&level=` (all params optional; use to fetch only valid downstream options)
- `GET /catalog/colleges?country=&stream=&level=`
- `GET /catalog/courses?country=&stream=&level=&college_name=`

The ROI endpoint uses custom formulas for:

- Current and future education costs
- Scholarship-adjusted net cost
- SIP required
- Future investment value
- ROI projection and payback period

## Dataset Integration

- Backend reads `backend/data/final_roi_dataset_v2.csv` into memory at startup.
- Frontend selectors for country, stream, level, college, and course are driven by the dataset.
- `POST /roi` now requires `college_name` and `course_name` in addition to country/stream/level inputs.
