# AlgoAssist

AlgoAssist is a full-stack learning platform with a `FastAPI` backend and a `Next.js` frontend.

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

- The backend now uses a local SQLite database.
- On Windows, the default path is `%LOCALAPPDATA%\AlgoAssist\algoassist.db`.
- No external database server is required for localhost.
- The frontend already points to the local backend through `NEXT_PUBLIC_API_BASE_URL`.
