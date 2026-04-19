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

Default local MongoDB settings:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=algoassist
```

Run a local MongoDB server before starting the API, or point `MONGODB_URI` at MongoDB Atlas.

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

- The backend uses MongoDB in both local and deployed environments.
- The app creates unique indexes for `users.id` and `users.email` during startup.
- Add a one-time data migration if you need to move existing SQLite user data into MongoDB.

## Render + MongoDB Deployment

Use these Render settings from `backend/`:

- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`

Recommended environment variables:

```env
ENVIRONMENT=production
PORT=10000
APP_NAME=AlgoAssist API
API_V1_PREFIX=/api/v1
SECRET_KEY=replace-with-a-long-random-secret
ACCESS_TOKEN_EXPIRE_MINUTES=60
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=algoassist
BACKEND_CORS_ORIGINS=["https://your-frontend.vercel.app"]
```

Behavior by environment:

- Local development and Render both use MongoDB.
- Render should set `MONGODB_URI` to your production MongoDB or MongoDB Atlas instance.
- The app binds correctly on Render with `--host 0.0.0.0 --port $PORT`.
