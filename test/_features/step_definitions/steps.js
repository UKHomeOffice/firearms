const { Given, Then, Before, After } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const mock = require('mock-fs');
const World = require('../test.setup.js');
const Model = require('../../../apps/common/models/file-upload');
const config = require('../../../config');
const uuid = require('uuid');
const sinon = require('sinon');
const reqres = require('hof').utils.reqres;

const getCase = require('../../../apps/supporting-documents/behaviours/get-case')
const checkEmail = require('../../../apps/supporting-documents/behaviours/check-email');

const domain = config.hosts.acceptanceTests;


Given('I start the {string} application journey', async function (subApp) {
  this.subApp = subApp === 'base' ? '' : `/${subApp}`;
  await this.page.goto(`${domain}${this.subApp}`);
}.bind(World));

Then('I select {string}', async function (name) {
  await this.page.click(`text=${name}`);
}.bind(World));

Then('I pick {string} to go to the {string} page', async function (name, value) {
  Before( async () => {
    //Stub out response from keycloak
    config.upload.hostname =  `${domain}${this.subApp}/api/file-upload`;
    const sandbox = sinon.createSandbox();
    sandbox.stub(Model.prototype, 'request').yieldsAsync(null, {
      api: 'response',
      url: '/file/12341212132123?foo=bar'
    });
    sandbox.stub(Model.prototype, 'auth').returns(new Promise(resolve => {
      resolve({bearer: 'myaccesstoken'});
    }));
  })
  await this.page.click('input[type="submit"]');
  await this.page.goto(`${domain}${this.subApp}/${value}`);
  After(async() => {
    sandbox.restore();
    mock.restore();
  });
}.bind(World));

//MOCK ICASEWORK DETAILS
Then('I select {string} to go get my case number and to the {string} page', async function (name, value) {
  let req;
  let res;
  let next;
  Before(async () => {
    req = reqres.req();
    res = reqres.res();
    next = () => {};
    req.sessionModel.set('original-email', 'test@test.com');
    req.sessionModel.set('original-name', 'Ronald Testman');
    const sandbox = sinon.createSandbox();
    sandbox.stub(getCase.prototype, 'saveValues').yieldsAsync(req, res, next);
  });
  await this.page.click(`text=${name}`);
  After(async() => {
    sandbox.restore();
  });
}.bind(World));

//MOCK ENTERED EMAIL IS THE SAME AS ICASEWORK NUMBER
Then('I select {string} to check my email and go to the {string} page', async function (name, value) {
  let req;
  let res;
  Before(async () => {
    req = reqres.req();
    res = reqres.res();
    req.sessionModel.SessionModel['original-email'] = 'test@test.com';
    const sandbox = sinon.createSandbox();
    sandbox.stub(checkEmail.prototype, 'validate').yieldsAsync();
  });
  await this.page.on('request', req => {
    // req.sessionModel.SessionModel['original-email'] = 'test@test.com';
    console.log(req.sessionModel);
  })
  await this.page.click(`text=${name}`);
  // await this.page.goto(`${domain}${this.subApp}/${value}`);
  After(() => {
    sandbox.restore();
  });
}.bind(World));

Then('I check {string}', async function (name) {
  await this.page.check(`#${name}`);
}.bind(World));

Then('I choose {string}', async function (name) {
  await this.page.click(`text=${name}`);
}.bind(World));

Then('I change {string}', async function (name) {
  await this.page.click(`text=Change ${name}`);
}.bind(World));

Then('I delete {string}', async function (name) {
  await this.page.click(`text=Delete ${name}`);
}.bind(World));

Then('I click the {string} button', async function (name) {
  await this.page.click(`text=${name}`);
}.bind(World));

Then('I submit the application', { timeout: 4 * 5000 }, async function () {
  await this.page.click('input[type="submit"]');
}.bind(World));

Then('I fill {string} with {string}', async function (field, value) {
  await this.page.fill(`input[name="${field}"]`, value);
}.bind(World));

Then('I fill {string} text area with {string}', async function (field, value) {
  await this.page.fill(`textarea[name="${field}"]`, value);
}.bind(World));

Then('I upload the {string} file to {string}', async function (file, name) {
  mock({'testPath/test.pdf': Buffer.from([8, 6, 7, 5, 3, 0, 9]) });
  await this.page.setInputFiles(`input#${name ? name : 'image'}`, `${file}`);
  mock.restore();
}.bind(World));

Then('I fill the date {string} with {string}', async function (field, date) {
  const dateArr = date.split('-');
  await this.page.fill(`input[name="${field}-day"]`, dateArr[0]);
  await this.page.fill(`input[name="${field}-month"]`, dateArr[1]);
  await this.page.fill(`input[name="${field}-year"]`, dateArr[2]);
}.bind(World));

Then('I enter a date of birth for a {int} year old', async function (years) {
  const now = new Date();
  await this.page.fill('input[name="date-of-birth-day"]', now.getUTCDate().toString());
  await this.page.fill('input[name="date-of-birth-month"]', (now.getUTCMonth() + 1).toString());
  await this.page.fill('input[name="date-of-birth-year"]', (now.getUTCFullYear() - years).toString());
}.bind(World));

Then('I enter a {string} date of birth for a {int} year old', async function (field, years) {
  const now = new Date();
  await this.page.fill(`input[name="${field}DateOfBirth-day"]`, now.getUTCDate().toString());
  await this.page.fill(`input[name="${field}DateOfBirth-month"]`, (now.getUTCMonth() + 1).toString());
  await this.page.fill(`input[name="${field}DateOfBirth-year"]`, (now.getUTCFullYear() - years).toString());
}.bind(World));

Then('I should be on the {string} page showing {string}', async function (uri, heading) {
  await this.page.waitForSelector('body', { timeout: 15000 });
  expect(new URL(await this.page.url()).pathname).to.eql(`${this.subApp}/${uri}`);
  expect(await this.page.innerText('body')).to.include(heading);
}.bind(World));

Then('I should see {string} on the page', async function (content) {
  await this.page.waitForSelector('body', { timeout: 15000 });
  expect(await this.page.innerText('body')).to.include(content);
}.bind(World));

Then('I should see the {string} error', async function (content) {
  await this.page.waitForSelector('body', { timeout: 15000 });
  expect(await this.page.innerText('.validation-summary.error-summary')).to.include(content);
}.bind(World));