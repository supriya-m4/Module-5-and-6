Write-Host "Running frontend test scripts..."

Push-Location "$PSScriptRoot\.."
try {
  npm test
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

  npm run test:e2e
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

  npm run test:smoke
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
  Pop-Location
}

Write-Host "Frontend test scripts completed."
