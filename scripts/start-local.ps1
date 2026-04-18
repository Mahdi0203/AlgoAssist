param(
    [switch]$InstallIfMissing
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $repoRoot "backend"
$frontendPath = Join-Path $repoRoot "frontend"
$backendEnvPath = Join-Path $backendPath ".env"
$frontendEnvPath = Join-Path $frontendPath ".env.local"
$backendVenvPython = Join-Path $backendPath ".venv\Scripts\python.exe"
$frontendNodeModules = Join-Path $frontendPath "node_modules"

function Write-Step {
    param([string]$Message)
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Ensure-FileFromExample {
    param(
        [string]$TargetPath,
        [string]$ExamplePath
    )

    if (-not (Test-Path $TargetPath)) {
        Copy-Item -LiteralPath $ExamplePath -Destination $TargetPath
    }
}

Write-Step "Preparing local environment files"
Ensure-FileFromExample -TargetPath $backendEnvPath -ExamplePath (Join-Path $backendPath ".env.example")
Ensure-FileFromExample -TargetPath $frontendEnvPath -ExamplePath (Join-Path $frontendPath ".env.example")

if (-not (Test-Path $backendVenvPython)) {
    if (-not $InstallIfMissing) {
        throw "Backend virtual environment not found. Run '.\scripts\start-local.ps1 -InstallIfMissing' once, or create backend\.venv manually."
    }

    Write-Step "Creating backend virtual environment"
    Push-Location $backendPath
    try {
        python -m venv .venv
    } finally {
        Pop-Location
    }
}

if ($InstallIfMissing) {
    Write-Step "Installing backend dependencies"
    Push-Location $backendPath
    try {
        & $backendVenvPython -m pip install -r requirements.txt
    } finally {
        Pop-Location
    }
}

if (-not (Test-Path $frontendNodeModules)) {
    if (-not $InstallIfMissing) {
        throw "Frontend dependencies are missing. Run '.\scripts\start-local.ps1 -InstallIfMissing' once, or run 'npm install' in frontend."
    }

    Write-Step "Installing frontend dependencies"
    Push-Location $frontendPath
    try {
        npm install
    } finally {
        Pop-Location
    }
}

Write-Step "Starting backend on http://127.0.0.1:8000"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$backendPath'; & '$backendVenvPython' -m uvicorn app.main:app --reload"
)

Write-Step "Starting frontend on http://127.0.0.1:3000"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$frontendPath'; npm run dev"
)

Write-Step "AlgoAssist is launching in two new terminals"
Write-Host "Frontend: http://127.0.0.1:3000" -ForegroundColor Green
Write-Host "Backend:  http://127.0.0.1:8000" -ForegroundColor Green
