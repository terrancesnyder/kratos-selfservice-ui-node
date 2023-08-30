#!/bin/bash -e
set -e -x

export KRATOS_PUBLIC_URL=https://secure.woven-city.io/kratos
export KRATOS_ADMIN_URL=https://kratos-admin.woven-city.io

export HYDRA_URL=https://secure.woven-city.io/hydra
export HYDRA_ADMIN_URL=https://hydra-admin.woven-city.io

# add trusted clients here for skipping consent
export TRUSTED_CLIENT_IDS=

export MOCK_TLS_TERMINATION=y

export PORT=3000

npm start --inspect
