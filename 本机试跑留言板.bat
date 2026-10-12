@echo off
title 自介网页 · 留言板本机试跑
cd /d "%~dp0"

rem ---- 找 node：先看 PATH，再看几个常见安装位置 ----
set "NODE="
for %%P in (node.exe) do if not defined NODE set "NODE=%%~$PATH:P"
if defined NODE goto :found
if exist "%ProgramFiles%\nodejs\node.exe" set "NODE=%ProgramFiles%\nodejs\node.exe"
if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE=%ProgramFiles(x86)%\nodejs\node.exe"
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "NODE=%LOCALAPPDATA%\Programs\nodejs\node.exe"
if exist "%APPDATA%\nvm\node.exe" set "NODE=%APPDATA%\nvm\node.exe"
if defined NODE goto :found

echo.
echo   没找到 Node.js。去 https://nodejs.org 装一个，装完再双击本文件。
echo.
pause
exit /b 1

:found

rem ---- 已经在跑就别再起一个，直接开页面 ----
netstat -ano | findstr ":8787" | findstr "LISTENING" >nul
if not errorlevel 1 goto :running

echo 正在本机试跑留言板：完全离线，不碰 Cloudflare。
echo 试出来的留言只存在 worker\.dev-kv.json 里，删掉这个文件就是清空。
echo 3 秒后自动打开 http://127.0.0.1:8787/
echo （关掉这个窗口 = 停掉试跑）
echo.
start "" /min cmd /c "ping -n 3 127.0.0.1 >nul & start http://127.0.0.1:8787/"
"%NODE%" worker\dev-server.mjs
echo.
echo 试跑已停止。按任意键关窗口。
pause >nul
exit /b 0

:running
echo 已经在跑了，直接开页面。
start "" http://127.0.0.1:8787/
exit /b 0