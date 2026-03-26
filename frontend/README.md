# Frontend (Next.js)

Next.js App Router frontend for the Education ROI calculator.

## Setup

1. Install dependencies:
	- `npm install`
2. Create env file:
	- copy `.env.example` to `.env.local`
3. Start dev server:
	- `npm run dev`

## Environment

- `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`)

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## UI Sections

- Header with top info strip and navigation
- ROI calculator input row
- Dynamic selectors for country, stream, level, college, and course
- Cost results table (current vs future)
- Affordability panel with SIP needed
- Right-side informational cards
