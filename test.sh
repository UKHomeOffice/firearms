#!/bin/bash

${PHANTOM_JS}/bin/phantomjs --webdriver=4444&

npm run hof-transpile

npm run test:acceptance
