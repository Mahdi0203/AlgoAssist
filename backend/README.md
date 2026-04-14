# AlgoAssist Backend

FastAPI backend scaffold for:

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/signin`
- `GET /api/v1/profile/me`
- `PATCH /api/v1/profile/me`

## Quick Start

### 1. Configure environment

From `backend/`:

```bash
copy .env.example .env
```

Default local DB connection:

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/algoassist
```

For Render deployment, replace this with your managed PostgreSQL connection string.

### 2. Create Python environment and install dependencies

From `backend/`:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the API locally

From `backend/`:

```bash
uvicorn app.main:app --reload
```

Backend will be available at `http://127.0.0.1:8000`.

## Frontend Connection

From `frontend/`:

```bash
copy .env.example .env.local
npm install
npm run dev
```

Default frontend API target:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

Frontend will be available at `http://127.0.0.1:3000`.

## End-to-End Flow

1. Make sure PostgreSQL is running locally or use a hosted PostgreSQL database.
2. Start the FastAPI backend from `backend/`.
3. Start the Next.js frontend from `frontend/`.
4. Open the app, create an account from the auth modal, then visit `/profile`.
5. Edit profile fields and save them with the check button.

## Render Notes

- Deploy `backend/` as a Python web service on Render.
- Use the start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- Add your hosted PostgreSQL `DATABASE_URL` in Render environment variables.
- Set `BACKEND_CORS_ORIGINS` to include your frontend URL.

## Notes

- This scaffold creates tables on startup for early development.
- Tables are created automatically when the FastAPI app starts.
- Add Alembic later when you are ready for migrations.
