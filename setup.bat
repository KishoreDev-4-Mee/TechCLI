@echo off
echo Setting up TechCLI environment...
echo Current directory: %CD%

REM Set TechCLI_PATH variable
setx TechCLI_PATH "%CD%" >nul 2>&1
if %errorlevel% equ 0 (
    echo TechCLI_PATH set successfully
) else (
    echo Failed to set TechCLI_PATH - Run as Administrator
)

REM Get current PATH and append new directory
for /f "tokens=2*" %%a in ('reg query "HKEY_CURRENT_USER\Environment" /v PATH 2^>nul') do set "CURRENT_PATH=%%b"

REM Check if directory is already in PATH
echo %CURRENT_PATH% | find /i "%CD%" >nul
if %errorlevel% equ 0 (
    echo Directory already in PATH
) else (
    REM Add to PATH
    setx PATH "%CURRENT_PATH%;%CD%" >nul 2>&1
    if %errorlevel% equ 0 (
        echo PATH updated successfully
        echo Please restart your command prompt or log off/on for changes to take effect
    ) else (
        echo Failed to update PATH - Run as Administrator
    )
)

echo.
echo Setup completed!
echo TechCLI_PATH: %CD%
pause