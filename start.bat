@echo off
echo =========================================
echo       Starting SafeCity AI System
echo =========================================

echo.
echo [1/2] Starting Backend Server...
start "SafeCity Backend" cmd /k "cd backend && ..\venv\Scripts\python.exe -m uvicorn app.main:app --reload"

echo [2/2] Starting Frontend Application...
start "SafeCity Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo =========================================
echo   Both services are launching in new windows!
echo   Frontend: http://localhost:5173
echo   Backend:  http://127.0.0.1:8000
echo =========================================
pause
