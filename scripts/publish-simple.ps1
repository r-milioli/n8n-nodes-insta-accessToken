# Script simples para publicar no NPM

Write-Host "Iniciando publicacao do n8n-nodes-instagram-token..." -ForegroundColor Green

# Build
Write-Host "Fazendo build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no build!" -ForegroundColor Red
    exit 1
}

Write-Host "Build concluido!" -ForegroundColor Green

# Testar pacote
Write-Host "Testando pacote..." -ForegroundColor Yellow
npm pack

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao testar pacote!" -ForegroundColor Red
    exit 1
}

Write-Host "Pacote testado!" -ForegroundColor Green

# Publicar
Write-Host "Publicando no NPM..." -ForegroundColor Yellow
npm publish --access public

if ($LASTEXITCODE -eq 0) {
    Write-Host "Publicacao concluida!" -ForegroundColor Green
    Write-Host "Pacote: https://www.npmjs.com/package/n8n-nodes-instagram-token" -ForegroundColor Cyan
} else {
    Write-Host "Erro na publicacao!" -ForegroundColor Red
    exit 1
}

# Limpeza
Remove-Item -Path "n8n-nodes-instagram-token-*.tgz" -Force -ErrorAction SilentlyContinue

Write-Host "Processo concluido!" -ForegroundColor Green
