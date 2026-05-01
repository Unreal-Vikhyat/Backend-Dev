#!/bin/bash

ENV=$1

if [ "$ENV" == "dev" ]; then
    git push heroku-dev main
elif [ "$ENV" == "staging" ]; then
    git push heroku-staging main
elif [ "$ENV" == "prod" ]; then
    echo "Deploy to IIS manually or CI/CD pipeline"
fi
