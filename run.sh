#!/bin/bash

if [ "$NODE_ENV" = "ci" ]
then echo "starting service"
  GA_TAG_ID=
fi

cp -r /app/public/* /public/

su nodejs -c 'exec node app.js'

