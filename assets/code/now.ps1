param(
    [switch]$t,
    [string]$TyporaPath,
    [switch]$w,
    [Parameter(Position=0, ValueFromRemainingArguments=$true)]
    [string[]]$Message
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

$folder  = Join-Path $vault "content\diary\$yyyy"

# if get the -w, set file as weekly note
if ($w) {
    $weekNumber = Get-Date -UFormat "%V"
    $weekFolder = Join-Path $vault "content\diary\$yyyy\weekly"
    $file = Join-Path $weekFolder "$yyyy-W$weekNumber.md"
    
    # Ensure weekly folder exists
    if (-not (Test-Path $weekFolder)) {
        New-Item -ItemType Directory -Path $weekFolder -Force | Out-Null
    }
    
    # Create file with weekly template if missing
    if (-not (Test-Path $file)) {
@"
---
title: "$yyyy-W$weekNumber"
date: "$isodate"
categories:
  - weekly
series:
  - group-meeting
tags:
  - reflection
mood:
weather:
location:
draft: true
---
"@ | Set-Content $file -Encoding UTF8
    }
}
else {
    $monthFolder = Join-Path $folder $month
    $file = Join-Path $monthFolder "$yyyy-$mm-$dd.md"
}

# ===== Ensure folders =====
if (-not (Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
}

# Ensure the parent directory of the target file exists (e.g., the month folder)
$parentDir = Split-Path -Path $file -Parent
if (-not (Test-Path $parentDir)) {
    New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
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
  - 
tags:
  - 
mood:
weather:
location:
rating: 1
stime:
release: 0
draft: true
---
"@ | Set-Content $file -Encoding UTF8
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

    # File is already created earlier, just open it
    Start-Process -FilePath $PathToTypora -ArgumentList "`"$file`""
}

# If -t specified, open Typora and exit
if ($t) {
    Open-TodayDiary -PathToTypora $TyporaPath
    Write-Host "Opened $file in Typora."
    return
}

# ===== One-line quick entry mode =====
if ($Message -and $Message.Count -gt 0) {
    $msg = ($Message -join ' ')
    # Replace \n with actual line breaks
    $msg = $msg -replace '\\n', "`r`n"
    Add-Content -Path $file -Value "`r`n### $curtime $msg" -Encoding UTF8
    Write-Host "Saved to $file"
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

# Clear-Host is removed to avoid disrupting terminal context, especially in VS Code.
return