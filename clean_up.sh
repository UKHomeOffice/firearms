#! /bin/bash
set -e

export IGNORE_RESOURCES=("file-vault")
export IGNORE_INGRESS=("file-vault-ingress")
export IGNORE_NETPOL=("acp-deny-all" "file-vault-allow-ingress")
export IGNORE_CONFIGMAP=("bundle" "fv-branch-configmap")

export kubectl="kubectl --insecure-skip-tls-verify --server=$KUBE_SERVER --namespace=$KUBE_NAMESPACE --token=$KUBE_TOKEN"

for each in $($kubectl get deploy -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_RESOURCES[@]} " =~ " ${each} " ]]; then
    $kubectl delete deploy "$each"
  fi
done

for each in $($kubectl get svc -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_RESOURCES[@]} " =~ " ${each} " ]]; then
    $kubectl delete svc "$each"
  fi
done

for each in $($kubectl get ing -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_INGRESS[@]} " =~ " ${each} " ]]; then
    $kubectl delete ing "$each"
  fi
done

for each in $($kubectl get netpol -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_NETPOL[@]} " =~ " ${each} " ]]; then
    $kubectl delete netpol "$each"
  fi
done

for each in $($kubectl get configmap -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_CONFIGMAP[@]} " =~ " ${each} " ]]; then
    $kubectl delete configmap "$each"
  fi
done
