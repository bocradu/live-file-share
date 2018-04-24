Write-Output 'Packaging app'
npm run package

Write-Output 'Generating zip file'
Compress-Archive -Path .\out\live-file-share-win32-x64 -DestinationPath .\out\dist\live-file-share-win32-x64.zip -Force
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$token = 'token ' + $Env:GITHUB_TOKEN
$headers.Add('Authorization', $token)
$uri = "https://api.github.com/repos/bocradu/live-file-share/releases"
$body = '{"tag_name": "v1.0.5",  "target_commitish": "master","name": "Live-file-share.v1.0.5","body": "","draft": false,"prerelease": false}'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Output 'Creating release'
$content = (Invoke-WebRequest -UseBasicParsing $uri -ContentType "application/json" -Method POST -Body $body -Headers $headers).Content | ConvertFrom-Json
$headers.Add('Content-Type', "application/zip")
$uploadUrl = $content.upload_url.Split([char]0x007B)[0] + "?name=live-file-share-win32-x64.zip"

Write-Output 'Upload zip file'
Invoke-WebRequest -UseBasicParsing $uploadUrl -ContentType "application/json" -Method POST -InFile .\out\dist\live-file-share-win32-x64.zip -Headers $headers


