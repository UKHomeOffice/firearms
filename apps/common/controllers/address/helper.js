'use strict';

const PostcodeController = require('./postcode');
const SelectAddressController = require('./select');
const ManualAddressController = require('./manual');

function applyDefaults(config) {
  return config;
}

function validateConfig(config) {
  const required = [
    'prefix',
    'start',
    'select',
    'manual',
    'next'
  ];

  required.forEach((key) => {
    if (!config[key]) {
      throw new Error(`options.${key} must be defined`);
    }
  });
}

module.exports = function addressLookupHelper(config) {
  config = applyDefaults(config);
  validateConfig(config);
  return {
    start: {
      template: 'address/postcode',
      controller: PostcodeController,
      prefix: config.prefix,
      manual: config.manual,
      select: config.select
    },
    select: {
      template: 'address/select',
      controller: SelectAddressController,
      prefix: config.prefix,
      manual: config.manual,
      backLink: config.start.replace(/^\//, ''),
      prereqs: [config.start],
      next: config.next
    },
    manual: {
      template: 'address/manual',
      controller: ManualAddressController,
      prefix: config.prefix,
      backLink: config.start.replace(/^\//, ''),
      next: config.next
    }
  };
};
