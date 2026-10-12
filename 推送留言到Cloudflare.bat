@echo off
title 自介网页 · 把留言搬进 Cloudflare
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

echo 把 gb\comments.json 同步到 Cloudflare 云端（以你本机这份为准）。
echo 你在后台隐藏 / 置顶 / 回复 / 删除的都会生效；网友刚发的不受影响。
echo 后端地址和钥匙读的是 .env 里的 GB_API_URL / GB_TOKEN。
echo.
"%NODE%" worker\import-to-kv.mjs
echo.
echo 按任意键关窗口。
pause >nul
exit /b 0