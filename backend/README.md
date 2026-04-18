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

Default local database path:

```env
DATABASE_PATH=algoassist.db
```

The app creates the SQLite database file automatically on startup.
On Windows, the default file is stored in `%LOCALAPPDATA%\AlgoAssist\algoassist.db`.

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

1. Start the FastAPI backend from `backend/`.
2. Start the Next.js frontend from `frontend/`.
3. Open the app, create an account from the auth modal, then visit `/profile`.
4. Edit profile fields and save them with the check button.

## Notes

- The backend uses a local SQLite file so it works on a fresh localhost setup without MongoDB.
- On Windows, the default database path resolves to `%LOCALAPPDATA%\AlgoAssist\algoassist.db`.
- Add migrations later if you plan to evolve the schema beyond local development.
