k3d cluster create expertlab -p "8080:80@loadbalancer"
kubectl apply -f .\namespace.yml
kubectl apply -f .\deployments.yml
kubectl apply -f .\services.yml
kubectl apply -f .\ingress.yml
Write-Host "`n`The app is now available on http://localhost:8080" -ForegroundColor Green
[system.Diagnostics.Process]::Start("chrome","http://localhost:8080/home.html")
Write-Host "`n`Press ENTER to exit and delete cluster ..." -ForegroundColor Red
Read-Host
k3d cluster delete expertlab