npm run package
Compress-Archive -Path .\out\live-file-share-win32-x64 -DestinationPath .\out\dist\live-file-share-win32-x64.zip -Force
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add('Authorization', 'token c5766b72731dc699ed737ede036f02087ac165e3')
$uri = "https://api.github.com/repos/bocradu/live-file-share/releases"
$body = '{"tag_name": "v1.0.5",  "target_commitish": "master","name": "Live-file-share.v1.0.5","body": "","draft": false,"prerelease": false}'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$content = (Invoke-WebRequest -UseBasicParsing $uri -ContentType "application/json" -Method POST -Body $body -Headers $headers).Content | ConvertFrom-Json
$headers.Add('Content-Type', "application/zip")
$uploadUrl = $content.upload_url.Split([char]0x007B)[0] + "?name=live-file-share-win32-x64.zip"
Invoke-WebRequest -UseBasicParsing $uploadUrl -ContentType "application/json" -Method POST -InFile .\out\dist\live-file-share-win32-x64.zip -Headers $headers


