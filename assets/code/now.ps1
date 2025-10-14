param(
    [switch]$t,            # -t to open today's diary in Typora
    [string]$TyporaPath    # Optional explicit Typora path
)

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
if (-not (Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder | Out-Null
}

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

function Open-TodayDiary {
    param(
        [string]$PathToTypora
    )
    if (-not $PathToTypora) {
        $candidatePaths = @(
            "$env:LOCALAPPDATA\Programs\Typora\Typora.exe",
            "C:\Program Files\Typora\Typora.exe",
            "C:\Program Files (x86)\Typora\Typora.exe"
        )
        $PathToTypora = $candidatePaths | Where-Object { Test-Path $_ } | Select-Object -First 1
        if (-not $PathToTypora) { $PathToTypora = "Typora.exe" } # rely on PATH
    }

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

    Start-Process -FilePath $PathToTypora -ArgumentList "`"$file`""
}

# If -t specified, open Typora and exit
if ($t) {
    Open-TodayDiary -PathToTypora $TyporaPath
    Write-Host "Opened $file in Typora."
    return
}

# ===== Input Mode =====
Write-Host "`r`n### $curtime " -ForegroundColor DarkYellow -NoNewline

$lines = @()
$emptyCount = 0   # count consecutive empty lines

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
    Add-Content -Path $file -Value "### $curtime $entry" -Encoding UTF8
    Write-Host "Saved to $file"
} else {
    Write-Host "No entry written."
}

Clear-Host
return