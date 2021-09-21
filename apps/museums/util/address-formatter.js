'use strict';

/**
 * Concatenates address at newline
 *
 * @param {Object} address - address to be formatted
 *
 * @returns {string} - the address separated with commas
 */

const concatenateAddress = address => {
  return address.formatted_address.split('\n').join(', ');
};

module.exports = {
  concatenateAddress
};
