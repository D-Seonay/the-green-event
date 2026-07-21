<#
.SYNOPSIS
    Hook PreToolUse sur l'outil Read — bloque la relecture d'un fichier déjà en contexte.

.DESCRIPTION
    À chaque tentative de lecture de fichier, ce script compare le LastWriteTimeUtc
    du fichier sur le disque avec la valeur enregistrée dans file_context_cache.json
    lors de la dernière lecture.

    - Si les timestamps sont identiques : le fichier n'a pas changé depuis sa lecture,
      il est déjà en contexte → la lecture est refusée (permissionDecision: deny).
    - Si les timestamps diffèrent (fichier modifié via Edit/Write ou par l'utilisateur
      depuis l'IDE) : la lecture est autorisée et le cache sera mis à jour par
      post_read_cache_update.ps1.

    Le cache est scopé par session_id ; il est ignoré entièrement si la session a changé.
#>
param()
$raw = [Console]::In.ReadToEnd()
try { $d = $raw | ConvertFrom-Json } catch { exit 0 }
$fp = $d.tool_input.file_path
$sid = $d.session_id
if (-not $fp) { exit 0 }
$cf = Join-Path $PSScriptRoot '..' 'file_context_cache.json'
if (-not (Test-Path $cf)) { exit 0 }
try { $cache = Get-Content $cf -Raw | ConvertFrom-Json } catch { exit 0 }
if ($cache.session_id -ne $sid) { exit 0 }
$entry = $cache.files.PSObject.Properties | Where-Object { $_.Name -eq $fp } | Select-Object -First 1
if (-not $entry) { exit 0 }
$ni = Get-Item $fp -ErrorAction SilentlyContinue
if (-not $ni) { exit 0 }
$nm = $ni.LastWriteTimeUtc.ToString('o')
$cm = if ($entry.Value -is [DateTime]) { $entry.Value.ToUniversalTime().ToString('o') } else { [string]$entry.Value }
if ($cm -eq $nm) {
    [ordered]@{
        hookSpecificOutput = [ordered]@{
            hookEventName        = 'PreToolUse'
            permissionDecision   = 'deny'
            permissionDecisionReason = "File already in context: $fp"
            additionalContext    = "NOTE: $fp is already loaded in your context this session. Do not re-read it."
        }
    } | ConvertTo-Json -Compress -Depth 3
}