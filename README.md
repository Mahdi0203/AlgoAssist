# AlgoAssist

AlgoAssist is a full-stack learning platform with a `FastAPI` backend and a `Next.js` frontend.

## Architecture

- `frontend/`: Next.js 14 app deployed to Vercel
- `backend/`: FastAPI app deployed to Render
- `MongoDB Atlas`: shared database for local development or production
- Frontend calls the backend through `NEXT_PUBLIC_API_BASE_URL`
- Backend serves API routes under `/api/v1`

## Project Structure

```text
AlgoAssist/
|-- backend/
|   |-- app/
|   |-- requirements.txt
|   `-- README.md
|-- frontend/
|   |-- src/
|   |-- package.json
|   `-- .env.example
|-- .gitignore
`-- README.md
```

## Run Locally

### One Command On Windows

From the repo root:

```powershell
.\scripts\start-local.ps1
```

If this is the first time on a new machine, use:

```powershell
.\scripts\start-local.ps1 -InstallIfMissing
```

That command:

- creates missing `.env` files from the examples
- optionally creates `backend/.venv` and installs missing dependencies
- opens one terminal for the backend
- opens one terminal for the frontend

### Backend

```powershell
cd backend
copy .env.example .env
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

### Frontend

Open a second terminal:

```powershell
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Local Development Notes

- The backend now uses MongoDB for both local development and deployment.
- Start a local MongoDB server for localhost, or point the backend at MongoDB Atlas.
- The frontend already points to the local backend through `NEXT_PUBLIC_API_BASE_URL`.
- Typical local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://127.0.0.1:8000`
- API base: `http://127.0.0.1:8000/api/v1`

## Deployment

### Frontend on Vercel

- Root directory: `frontend`
- Framework preset: `Next.js`
- Build command: `npm run build`
- Install command: `npm install`
- Set `NEXT_PUBLIC_API_BASE_URL` to your Render backend URL, for example `https://your-backend.onrender.com/api/v1`
- No `vercel.json` is required for the current frontend setup

### Backend on Render

- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`
- `render.yaml` is included at the repo root for the backend service definition
- Set `SECRET_KEY` to a strong production secret
- Set `MONGODB_URI` to your MongoDB connection string
- Set `MONGODB_DB_NAME` if you want a name other than `algoassist`
- Set `ENVIRONMENT=production`
- Set `BACKEND_CORS_ORIGINS` to your Vercel frontend URL. You can use either JSON or comma-separated values.

### MongoDB Atlas Setup

1. Create a MongoDB Atlas project and cluster.
2. Create a database user with read/write access.
3. Add your IP or allow access from your deployment platform as needed.
4. Copy the connection string into `MONGODB_URI`.
5. Set `MONGODB_DB_NAME=algoassist` or your preferred database name.

### Required Environment Variables

Frontend on Vercel:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com/api/v1
```

Backend on Render:

```env
ENVIRONMENT=production
APP_NAME=AlgoAssist API
API_V1_PREFIX=/api/v1
ACCESS_TOKEN_EXPIRE_MINUTES=60
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=algoassist
SECRET_KEY=replace-with-a-long-random-secret
BACKEND_CORS_ORIGINS=["https://your-frontend.vercel.app"]
```

### Deployment Order

1. Create the MongoDB Atlas cluster and get the connection string.
2. Deploy the backend to Render with the required environment variables.
3. Confirm the backend health check is live at `/health`.
4. Deploy the frontend to Vercel.
5. Set `NEXT_PUBLIC_API_BASE_URL` in Vercel to the Render backend URL with `/api/v1`.
6. Update `BACKEND_CORS_ORIGINS` in Render with the final Vercel domain if needed.

### Troubleshooting

- `NEXT_PUBLIC_API_BASE_URL is not configured`
- Set the frontend env variable in Vercel to `https://your-backend.onrender.com/api/v1`.
- CORS errors in the browser
- Make sure `BACKEND_CORS_ORIGINS` contains the exact Vercel frontend origin, such as `https://your-frontend.vercel.app`.
- `401` after sign-in
- Confirm the frontend is calling the correct backend base URL and the token is being sent in the `Authorization` header.
- Render service starts but requests fail
- Check that `MONGODB_URI` is valid and that MongoDB Atlas network access allows the Render connection.
- Frontend cannot reach backend routes
- Make sure the frontend env includes `/api/v1`, because the backend mounts routes under that prefix.

### Database Behavior

- Localhost and Render both use MongoDB.
- The backend creates unique indexes for `users.id` and `users.email` at startup.
