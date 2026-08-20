@echo off
title Launch Srivardhan Magic SCERT Platform
echo Starting local web server on port 8082...
echo The browser should open automatically.
echo Keep this window open while studying. Press Ctrl+C to close the server.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
