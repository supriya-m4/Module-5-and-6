Write-Host "Running backend test scripts..."

Push-Location "$PSScriptRoot\.."
try {
  npm run test:unit
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

  npm run test:integration
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
  Pop-Location
}

Write-Host "Backend test scripts completed."
