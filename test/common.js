'use strict';

global.chai = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'));
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');
require('sinon-as-promised');
require('sinomocha')();

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
