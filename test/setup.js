'use strict';

process.env.NODE_ENV = 'test';

global.chai = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'));
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');

global.reqres = require('hof').utils.reqres;
process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
