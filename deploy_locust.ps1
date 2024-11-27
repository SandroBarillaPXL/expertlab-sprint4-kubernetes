kubectl apply -f ./locust/k8s 
Write-Host "eventjes wachten tot Locust is gedeployed.." -ForegroundColor Blue
kubectl wait -n locust --for=condition=available --all deployments --timeout=500s
Start-Job -ScriptBlock { kubectl port-forward -n locust svc/locust-master-ui 30627:8089 }
Write-Host "Locust draait nu op http://localhost:30627" -ForegroundColor Green