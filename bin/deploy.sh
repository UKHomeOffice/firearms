#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'
redis_storage_files='kube/redis/redis-persistent-volume-claim.yml'
redis_runtime_files='kube/redis/redis-service.yml -f kube/redis/redis-network-policy.yml -f kube/redis/redis-deployment.yml'

export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-}
export REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}
export REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
export REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-gp2-encrypted}
export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-}
export REDIS_PERSISTENCE_ANNOTATIONS_FILE=${REDIS_PERSISTENCE_ANNOTATIONS_FILE:-}
export REDIS_DELETE_PVC_ON_TEARDOWN=${REDIS_DELETE_PVC_ON_TEARDOWN:-false}

sanitize_branch_name() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
}

set_redis_persistence() {
  REDIS_PERSISTENCE_ENABLED=$(echo "$REDIS_PERSISTENCE_ENABLED" | tr '[:upper:]' '[:lower:]')
  export REDIS_PERSISTENCE_ENABLED

  case "${KUBE_NAMESPACE}" in
    "${PROD_ENV}")
      export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-true}
      export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-10Gi}
      ;;
    "${STG_ENV}")
      export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-true}
      export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-1Gi}
      ;;
    "${BRANCH_ENV}")
      export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-false}
      export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-1Gi}
      ;;
    *)
      export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-false}
      export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-1Gi}
      ;;
  esac
}

should_deploy_redis_storage() {
  [[ (${KUBE_NAMESPACE} == ${STG_ENV} || ${KUBE_NAMESPACE} == ${PROD_ENV}) && ${REDIS_PERSISTENCE_ENABLED} == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]
}

deploy_redis_storage() {
  if should_deploy_redis_storage; then
    $kd -f $redis_storage_files
  fi
}

deploy_redis_runtime() {
  $kd -f $redis_runtime_files
}

delete_redis() {
  if [[ ${REDIS_DELETE_PVC_ON_TEARDOWN} == "true" ]] && should_deploy_redis_storage; then
    $kd --delete -f $redis_storage_files
  fi

  $kd --delete -f $redis_runtime_files
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(sanitize_branch_name "$(cat /root/.dockersock/branch_name.txt)")
  set_redis_persistence

  $kd --delete -f kube/configmaps/configmap.yml
  delete_redis
  $kd --delete -f kube/html-pdf -f kube/app
  echo "Torn Down UAT Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

if [[ -z "$1" ]]; then
  echo "Usage: bin/deploy.sh <namespace|tear_down>"
  exit 1
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(sanitize_branch_name "$DRONE_SOURCE_BRANCH")
set_redis_persistence

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/configmaps -f kube/certs
  deploy_redis_runtime
  $kd -f kube/html-pdf -f kube/file-vault -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/networkpolicy-internal.yml
  deploy_redis_runtime
  $kd -f kube/html-pdf -f kube/file-vault -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/networkpolicy-internal.yml
  deploy_redis_storage
  deploy_redis_runtime
  $kd -f kube/html-pdf -f kube/file-vault -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  deploy_redis_storage
  deploy_redis_runtime
  $kd -f kube/html-pdf -f kube/file-vault -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "External Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Internal Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "File Vault Branch - fv-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  echo "External UAT url - dev.notprod.$APP_NAME.homeoffice.gov.uk"
  echo "Internal UAT url - $APP_NAME.uat.internal.sas-notprod.homeoffice.gov.uk"
  echo "File Vault UAT url - supp-docs-dev.notprod.$APP_NAME.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  echo "External UAT url - preprod.prod.$APP_NAME.homeoffice.gov.uk"
  echo "Internal UAT url - stg.internal.$APP_NAME.sas.homeoffice.gov.uk"
  echo "File Vault UAT url - supp-docs-preprod.prod.$APP_NAME.sas.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  echo "External PROD url - $PRODUCTION_URL"
  echo "File Vault Prod url - supp-docs.prod.$APP_NAME.homeoffice.gov.uk"
fi
