@echo off
title 自介网页 · 从 Cloudflare 拉取留言
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

echo 把 Cloudflare 上网友发的留言拉回 gb\comments.json。
echo 同一个 id 以你本机那份为准，你自己改过的不会被覆盖。
echo 拉回来之后，双击「启动后台.bat」就能隐藏 / 置顶 / 回复 / 删除。
echo Worker 地址和钥匙读的是 .env 里的 GB_WORKER_URL / GB_TOKEN。
echo.
"%NODE%" worker\pull-from-kv.mjs
echo.
echo 按任意键关窗口。
pause >nul
exit /b 0