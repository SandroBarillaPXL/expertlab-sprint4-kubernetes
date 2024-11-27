k3d cluster create expertlab -p "8080:80@loadbalancer"

kubectl apply -f ./k8s
kubectl apply -f ./locust/k8s 

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
Write-Host "eventjes wachten tot Argo CD is gedeployed.." -ForegroundColor Blue
kubectl wait -n argocd --for=condition=available --all deployments --timeout=500s
$password = $([Text.Encoding]::Utf8.GetString([Convert]::FromBase64String($(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"))))
argocd login localhost:8181 --username admin --password $password --insecure
argocd repo add https://github.com/SandroBarillaPXL/expertlab-sprint4-kubernetes --username SandroBarillaPXL --password $(cat ./argocd/gh_pat.txt) 
kubectl apply -f ./argocd/application.yml

Write-Host "eventjes wachten tot Locust is gedeployed.." -ForegroundColor Blue
kubectl wait -n locust --for=condition=available --all deployments --timeout=500s

Write-Host "eventjes wachten tot de app is gedeployed.." -ForegroundColor Blue
kubectl wait -n expertlab --for=condition=available --all deployments --timeout=500s

Start-Job -ScriptBlock { kubectl port-forward -n argocd svc/argocd-server 8181:443 }
Start-Job -ScriptBlock { kubectl port-forward -n locust svc/locust-master-ui 30627:8089 }

Write-Host "`n`de app is nu bereikbaar op http://localhost:8080/home.html" -ForegroundColor Green
Write-Host "Locust is nu bereikbaar op http://localhost:30627" -ForegroundColor Green
Write-Host "Argo CD is nu bereikbaar op http://localhost:8181" -ForegroundColor Green
Write-Host "log in met admin / $password" -ForegroundColor Cyan

Write-Host "`n`Press ENTER to exit and delete cluster ..." -ForegroundColor Red
Read-Host
k3d cluster delete expertlab