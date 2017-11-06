'use strict';

const prepare = require('../../../apps/new-dealer/models/submission');

describe('S5 Submission Model', () => {

  describe('Authority Type', () => {

    const defaults = {
      'weapons-ammunition': [],
      'weapons-type': [],
      obtain: []
    };

    it('sets authority type to `Maritime Guards` if usage is to arm guards', () => {

      const input = Object.assign({}, defaults, {
        usage: 'arm-guards'
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Maritime Guards');
    });

    it('sets authority type to `Maritime Guards` if usage is to arm guards and any other usage', () => {

      const input = Object.assign({}, defaults, {
        usage: [
          'transport',
          'arm-guards'
        ]
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Maritime Guards');
    });

    it('sets authority type to `Carriers` if usage is to transport', () => {

      const input = Object.assign({}, defaults, {
        usage: 'transport'
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets authority type to `Carriers` if usage is to transfer', () => {

      const input = Object.assign({}, defaults, {
        usage: 'transfer'
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transfer and any other usage', () => {

      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'transfer'
        ]
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transport and any other usage', () => {

      const input = Object.assign({}, defaults, {
        usage: [
          'deactivation',
          'transport'
        ]
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Dealer` if usage is any other usage', () => {

      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'deactivation'
        ]
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Dealer');
    });

    it('usage can be a string', () => {

      const input = Object.assign({}, defaults, {
        usage: 'transfer'
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Carriers');
    });

  });

});
