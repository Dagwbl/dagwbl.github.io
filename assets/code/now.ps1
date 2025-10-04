# ===== CONFIG =====
$hostname = $env:COMPUTERNAME
if ($hostname -eq "DESKTOP-KC9K3N7") {
    $vault = "D:\blog"
} else {
    $vault = "D:\A\Jeapo's blog"
}

Set-Location -Path $vault

# ===== DATE INFO =====
$yyyy    = Get-Date -Format "yyyy"
$month   = Get-Date -Format "MMMM"
$mm      = Get-Date -Format "MM"
$dd      = Get-Date -Format "dd"
$curtime = Get-Date -Format "HH:mm"
$isodate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$folder  = Join-Path $vault "\content\diary\$yyyy\$month"
$file    = Join-Path $folder "$yyyy-$mm-$dd.md"

# ===== Ensure folders =====
if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder | Out-Null }

# ===== Create file with template if missing =====
if (-not (Test-Path $file)) {
@"
---
title: "$yyyy-$mm-$dd"
date: "$isodate"
categories:
  - diary
series:
tags:
mood:
weather:
location:
rating: 1
stime:
release: 0
draft: true
---
"@ | Set-Content $file
}

# ===== Input Mode =====
# Write-Host "Wow! What did you do just now?" -ForegroundColor Cyan
# Write-Host "Type your entry. Press Enter 3 times to finish." -ForegroundColor DarkGray
Write-Host "`r`n### $curtime " -ForegroundColor DarkYellow -NoNewline

$lines = @()
$emptyCount = 0   # 记录连续空行次数

while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) {
        $emptyCount++
        if ($emptyCount -ge 3) { break }
        $lines += $line
    } else {
        $emptyCount = 0
        $lines += $line
    }
}

$entry = $lines -join "`r`n"

if ($entry.Trim().Length -gt 0) {
    Add-Content -Path $file -Value "`r`n### $curtime $entry"
    Write-Host "Saved to $file"
} else {
    Write-Host "No entry written."
}
