param(
  [int]$Port = 4174
)

$root = $PSScriptRoot
Write-Host "Serving dashboard from $root on http://127.0.0.1:$Port/"

$command = Get-Command py -ErrorAction SilentlyContinue
if ($command) {
  & $command.Source -m http.server $Port --bind 127.0.0.1 --directory $root
  exit $LASTEXITCODE
}

$command = Get-Command python -ErrorAction SilentlyContinue
if ($command) {
  & $command.Source -m http.server $Port --bind 127.0.0.1 --directory $root
  exit $LASTEXITCODE
}

throw "Python was not found. Install Python or update run-dashboard.ps1 with the correct executable path."
