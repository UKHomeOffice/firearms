'use strict';

const proxyquire = require('proxyquire');

class ValidationError extends Error {
  constructor(field, details) {
    super(details.type);
    this.field = field;
    this.details = details;
  }
}

class BaseController {
  constructor(options) {
    this.options = options;
    this.ValidationError = ValidationError;
  }

  validateField(key) {
    return `validated:${key}`;
  }
}

const Nationality = proxyquire('../../../../apps/new-dealer/controllers/authority-holders-nationality', {
  '../../common/controllers/base': BaseController
});

const request = (first, second, third) => ({
  form: {
    values: {
      nationality: first,
      'nationality-second': second,
      'nationality-third': third
    }
  }
});

describe('Authority holder nationality controller', () => {
  let controller;

  beforeEach(() => {
    controller = new Nationality({locals: {key: 'nationality'}});
  });

  it('rejects a second nationality matching the first case-insensitively', () => {
    const error = controller.validateField('nationality', request('British', 'BRITISH', 'French'));

    expect(error.field).to.equal('nationality-second');
    expect(error.details.type).to.equal('same-first-nationality');
  });

  it('rejects a third nationality matching the first', () => {
    const error = controller.validateField('nationality', request('British', 'French', 'British'));

    expect(error.field).to.equal('nationality-third');
    expect(error.details.type).to.equal('same-first-nationality');
  });

  it('rejects a third nationality matching the second', () => {
    const error = controller.validateField('nationality', request('British', 'French', 'French'));

    expect(error.field).to.equal('nationality-third');
    expect(error.details.type).to.equal('same-multi-nationality');
  });

  it('allows distinct and empty nationalities through base validation', () => {
    expect(controller.validateField('nationality', request('British', 'French', 'Spanish')))
      .to.equal('validated:nationality');
    expect(controller.validateField('nationality', request('', '', '')))
      .to.equal('validated:nationality');
  });

  it('delegates unrelated fields', () => {
    expect(controller.validateField('other-field', request('British', 'British', 'British')))
      .to.equal('validated:other-field');
  });
});
