#!/bin/bash

${PHANTOM_JS}/bin/phantomjs --webdriver=4444&

npm run test:acceptance
