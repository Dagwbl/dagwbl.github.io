# ===== CONFIG =====
$hostname = $env:COMPUTERNAME
if ($hostname -eq "DESKTOP-KC9K3N7") {
    $vault = "D:\blog\content\diary"
} else {
    $vault = "D:\A\Jeapo's blog\content\diary"
}

# ===== DATE INFO =====
$yyyy    = Get-Date -Format "yyyy"
$month   = Get-Date -Format "MMMM"
$mm      = Get-Date -Format "MM"
$dd      = Get-Date -Format "dd"
$curtime = Get-Date -Format "HH:mm"
$isodate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$folder  = Join-Path $vault "$yyyy\$month"
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
rating:
stime:
release: 0
draft: true
---
"@ | Set-Content $file
}

# ===== Input Mode =====
Write-Host "Wow! What did you do just now?" -ForegroundColor Cyan
Write-Host "Press Ctrl+D to save and exit" -ForegroundColor DarkGray
Write-Host "### $curtime " -ForegroundColor DarkYellow -NoNewline

# Gather multiline input until Ctrl+D
$entry = @()
$savedPressed = $false

while (-not $savedPressed) {
    if ([Console]::KeyAvailable) {
        $key = [Console]::ReadKey($true)
        
        # Check for Ctrl+D
        if ($key.Key -eq 'D' -and $key.Modifiers -eq 'Control') {
            $savedPressed = $true
            Write-Host ""  # New line after Ctrl+D
            break
        }
        # Handle Enter key
        elseif ($key.Key -eq 'Enter') {
            Write-Host ""
            if ($currentLine.Length -gt 0 -or $entry.Count -gt 0) {
                $entry += $currentLine
                $currentLine = ""
            }
        }
        # Handle Backspace
        elseif ($key.Key -eq 'Backspace') {
            if ($currentLine.Length -gt 0) {
                $currentLine = $currentLine.Substring(0, $currentLine.Length - 1)
                Write-Host "`b `b" -NoNewline
            }
        }
        # Regular character input
        elseif (-not [char]::IsControl($key.KeyChar)) {
            $currentLine += $key.KeyChar
            Write-Host $key.KeyChar -NoNewline
        }
    }
    Start-Sleep -Milliseconds 50
}

# Add the last line if exists
if ($currentLine.Length -gt 0) {
    $entry += $currentLine
}

# ===== Write Entry =====
if ($entry.Count -gt 0) {
    $joined = $entry -join "`r`n"
    Add-Content -Path $file -Value "`r`n### $curtime $joined"
    Write-Host "Saved to $file" -ForegroundColor Green
} else {
    Write-Host "No entry written." -ForegroundColor Red
}