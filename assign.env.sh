#!/bin/bash 
ENVIRONMENT=${1}

if [[ -z "${ENVIRONMENT}" ]]; then
    echo "Environment not defined ... defaulting to staging."
    ENVIRONMENT="staging"
fi

# load the environment variables
. ./env.${ENVIRONMENT}.secret

# this should match the constants.js file and is required by apex up since we don't use environment files in a serverless environment
up env add PORT ${PORT} -s ${ENVIRONMENT}

up env add JWT_SECRET ${JWT_SECRET} -s ${ENVIRONMENT}

up env add WEBHOOK_SIGNATURE ${WEBHOOK_SIGNATURE} -s ${ENVIRONMENT}