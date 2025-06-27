@echo off
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js not found. Please install Node.js
    exit /b 1
)
node "%TechCLI_PATH%\index.mjs" %*