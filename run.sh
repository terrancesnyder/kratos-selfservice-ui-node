#!/bin/bash -e
set -e -x

sudo npm cache clear --force

# rm -rf ./node_modules/@ory
rm -rf ./node_modules/@ory/elements-markup
# rm -rf ./node_modules/@ory/elements-preact
# rm -rf ./node_modules/@ory/elements-react

# npm install
npm i ../elements/packages/markup
# npm i ../elements/packages/preact
# npm i ../elements/packages/react

export KRATOS_PUBLIC_URL=https://secure.woven-city.io/kratos
export KRATOS_ADMIN_URL=https://kratos-admin.woven-city.io

export HYDRA_URL=https://secure.woven-city.io/hydra
export HYDRA_ADMIN_URL=https://hydra-admin.woven-city.io

# add trusted clients here for skipping consent
export TRUSTED_CLIENT_IDS=(put list of oauth client ids you wish to skip here)

export MOCK_TLS_TERMINATION=y

export PORT=

npm start 
