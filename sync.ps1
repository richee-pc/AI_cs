# -----------------------------------------------------------------------------
#  sync.ps1
#  Copies the latest guide page from the parent folder into this repo,
#  commits the change, and pushes it to GitHub.
#  Streamlit Community Cloud redeploys automatically after the push.
#
#  Usage:  right-click -> "Run with PowerShell"
#          or:  powershell -ExecutionPolicy Bypass -File sync.ps1
# -----------------------------------------------------------------------------

$ErrorActionPreference = "Stop"
$repo   = Split-Path -Parent $MyInvocation.MyCommand.Path
$source = Join-Path (Split-Path -Parent $repo) "수행평가_안내_비선형구조-알고리즘.html"
$target = Join-Path $repo "page.html"

Set-Location $repo

Write-Host ""
Write-Host "[1/4] Copying the guide page..." -ForegroundColor Cyan

if (-not (Test-Path $source)) {
    Write-Host "  ERROR: source file not found:" -ForegroundColor Red
    Write-Host "  $source"
    Write-Host "  Nothing was changed. Press Enter to close."
    Read-Host
    exit 1
}

Copy-Item $source $target -Force
Write-Host "  page.html updated."

Write-Host "[2/4] Checking for changes..." -ForegroundColor Cyan
$changes = git status --porcelain

if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host "  No changes to publish. Everything is already up to date." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Enter to close."
    Read-Host
    exit 0
}

git status --short

Write-Host "[3/4] Committing..." -ForegroundColor Cyan
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git add -A
git commit -q -m "Update guide page ($stamp)"
Write-Host "  committed."

Write-Host "[4/4] Pushing to GitHub..." -ForegroundColor Cyan
git push -q origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "  Done. Streamlit will redeploy in a minute or two." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  Push failed. Check your network or GitHub credentials." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press Enter to close."
Read-Host
