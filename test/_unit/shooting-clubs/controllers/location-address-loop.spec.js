'use strict';

const proxyquire = require('proxyquire');

class LoopController {
  getLoopFields() {
    return {
      'location-address': '1 Range Road',
      'location-address-category': ['rifle', 'pistol'],
      unrelated: true
    };
  }

  locals() {
    return {base: true, items: this.items || []};
  }
}

const LocationLoop = proxyquire('../../../../apps/shooting-clubs/controllers/location-address-loop', {
  '../../common/controllers/loop': LoopController
});

describe('Shooting clubs location address loop', () => {
  it('removes the location prefix from aggregate fields', () => {
    expect(new LocationLoop().getLoopFields({}, {})).to.deep.equal({
      address: '1 Range Road',
      'address-category': ['rifle', 'pistol'],
      unrelated: true
    });
  });

  it('formats items and translated categories for locals', () => {
    const controller = new LocationLoop();
    controller.items = [{
      id: 'id-1',
      address: '1 Range Road',
      'address-category': ['rifle', 'pistol']
    }];
    const req = {
      translate: sinon.stub()
    };
    req.translate.withArgs('fields.location-address-category.options.rifle.label').returns('Rifle');
    req.translate.withArgs('fields.location-address-category.options.pistol.label')
      .returns('fields.location-address-category.options.pistol.label');

    const result = controller.locals(req, {});

    expect(result.base).to.equal(true);
    expect(result.items).to.deep.equal([{
      id: 'id-1',
      address: '1 Range Road',
      categories: 'Rifle\npistol'
    }]);
    expect(result.hasCategories).to.equal(true);
  });

  it('handles a scalar category and empty item list', () => {
    const controller = new LocationLoop();
    const req = {translate: key => key};

    expect(controller.translateCategories(req, 'rifle')).to.equal('rifle');
    expect(controller.locals(req, {}).hasCategories).to.equal(false);
  });
});
