'use strict';

function notBothOptions(values) {
  values = !Array.isArray(values) ? [values] : values;
  return !(values.length > 1 && values.indexOf('unspecified') > -1);
}

module.exports = {
  activity: {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'new',
      'renew'
    ]
  },
  'authority-number': {
    mixin: 'input-text',
    validate: 'required'
  },
  'reference-number': {
    mixin: 'input-text',
    validate: 'required'
  },
  organisation: {
    mixin: 'radio-group',
    validate: 'required',
    className: 'form-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'company',
      toggle: 'company-name',
      child: 'partials/company'
    }, {
      value: 'sole-trader',
      toggle: 'sole-trader-name',
      child: 'input-text'
    }, {
      value: 'shooting-club',
      toggle: 'shooting-club-name',
      child: 'input-text'
    }, {
      value: 'charity',
      toggle: 'charity-name',
      child: 'partials/charity'
    }, {
      value: 'museum',
      toggle: 'museum-name',
      child: 'input-text'
    }, {
      value: 'other',
      toggle: 'other-specify',
      child: 'input-text'
    }]
  },
  'sole-trader-name': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'sole-trader'
    }
  },
  'company-name': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'company'
    }
  },
  'company-house-number': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'company'
    }
  },
  'shooting-club-name': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'shooting-club'
    }
  },
  'charity-name': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'charity'
    }
  },
  'charity-number': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'charity'
    }
  },
  'museum-name': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'museum'
    }
  },
  'other-specify': {
    validate: 'required',
    dependent: {
      field: 'organisation',
      value: 'other'
    }
  },
  'weapons-ammunition': {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [
      'weapons',
      'ammunition'
    ]
  },
  obtain: {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [
      'buy',
      'temporary-possession',
      'manufacture',
      'wont-take-possession',
      {
        value: 'other-means',
        toggle: 'other-means-details',
        child: 'textarea'
      }
    ]
  },
  'other-means-details': {
    validate: 'required',
    dependent: {
      field: 'obtain',
      value: 'other-means'
    }
  },
  'stored-on-premises': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'true',
    }, {
      value: 'false',
      toggle: 'no-storage-details',
      child: 'textarea'
    }]
  },
  'no-storage-details': {
    validate: 'required',
    dependent: {
      field: 'stored-on-premises',
      value: 'false'
    }
  },
  usage: {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [{
      value: 'sell',
      toggle: 'sell-details',
      child: 'textarea'
    }, {
      value: 'transport',
      toggle: 'transport-details',
      child: 'textarea'
    }, {
      value: 'transfer',
      toggle: 'transfer-details',
      child: 'textarea'
    }, {
      value: 'arm-guards'
    }, {
      value: 'training',
      toggle: 'training-details',
      child: 'textarea'
    }, {
      value: 'research',
      toggle: 'research-details',
      child: 'textarea'
    }, {
      value: 'other',
      toggle: 'other-details',
      child: 'textarea'
    }]
  },
  'sell-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'sell'
    }
  },
  'transport-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'transport'
    }
  },
  'transfer-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'transfer'
    }
  },
  'training-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'training'
    }
  },
  'research-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'research'
    }
  },
  'other-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'other'
    }
  },
  'weapon-types': {
    mixin: 'checkbox-group',
    validate: ['required', notBothOptions],
    options: [{
      value: 'unspecified',
      toggle: 'weapons-unspecified-details',
      child: 'partials/weapons-ammo-unspecified'
    }, {
      value: 'fully-automatic',
      toggle: 'fully-automatic-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'self-loading',
      toggle: 'self-loading-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'short-pistols',
      toggle: 'short-pistols-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'short-self-loading',
      toggle: 'short-self-loading-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'large-revolvers',
      toggle: 'large-revolvers-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'rocket-launchers',
      toggle: 'rocket-launchers-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'air-rifles',
      toggle: 'air-rifles-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'fire-noxious-substance',
      toggle: 'fire-noxious-substance-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'disguised-firearms',
      toggle: 'disguised-firearms-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'military-use-rockets',
      toggle: 'military-use-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'projecting-launchers',
      toggle: 'projecting-launchers-quantity',
      child: 'partials/details-summary'
    }]
  },
  'weapons-unspecified-details': {
    validate: 'required',
    dependent: {
      field: 'weapon-types',
      value: 'unspecified'
    }
  },
  'fully-automatic-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'fully-automatic'
    }
  },
  'self-loading-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'self-loading'
    }
  },
  'short-pistols-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'short-pistols'
    }
  },
  'short-self-loading-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'short-self-loading'
    }
  },
  'large-revolvers-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'large-revolvers'
    }
  },
  'rocket-launchers-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'rocket-launchers'
    }
  },
  'air-rifles-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'air-rifles'
    }
  },
  'fire-noxious-substance-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'fire-noxious-substance'
    }
  },
  'disguised-firearms-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'disguised-firearms'
    }
  },
  'military-use-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'military-use-rockets'
    }
  },
  'projecting-launchers-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'weapon-types',
      value: 'projecting-launchers'
    }
  },
  'ammunition-types': {
    mixin: 'checkbox-group',
    validate: ['required', notBothOptions],
    options: [{
      value: 'unspecified',
      toggle: 'ammunition-unspecified-details',
      child: 'partials/weapons-ammo-unspecified'
    }, {
      value: 'explosive-cartridges',
      toggle: 'explosive-cartridges-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'incendiary-missile',
      toggle: 'incendiary-missile-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'armour-piercing',
      toggle: 'armour-piercing-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'expanding-missile',
      toggle: 'expanding-missile-quantity',
      child: 'partials/details-summary'
    }, {
      value: 'missiles-for-above',
      toggle: 'missiles-for-above-quantity',
      child: 'partials/details-summary'
    }]
  },
  'ammunition-unspecified-details': {
    validate: 'required',
    dependent: {
      field: 'ammunition-types',
      value: 'unspecified'
    }
  },
  'explosive-cartridges-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'ammunition-types',
      value: 'explosive-cartridges'
    }
  },
  'incendiary-missile-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'ammunition-types',
      value: 'incendiary-missile'
    }
  },
  'armour-piercing-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'ammunition-types',
      value: 'armour-piercing'
    }
  },
  'expanding-missile-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'ammunition-types',
      value: 'expanding-missile'
    }
  },
  'missiles-for-above-quantity': {
    validate: 'numeric',
    dependent: {
      field: 'ammunition-types',
      value: 'missiles-for-above'
    }
  },
  'authority-holders': {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'one',
      'two'
    ]
  },
  'first-authority-holders-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-authority-holders-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'first-authority-dob': {
  },
  'first-authority-dob-day': {
    validate: ['required', 'numeric']
  },
  'first-authority-dob-month': {
    validate: ['required', 'numeric']
  },
  'first-authority-dob-year': {
    validate: ['required', 'numeric']
  },
  'first-authority-town-birth': {
    mixin: 'input-text',
    validate: 'required'
  },
  'first-authority-country-birth': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-authority-dob': {
  },
  'second-authority-dob-day': {
    validate: ['required', 'numeric']
  },
  'second-authority-dob-month': {
    validate: ['required', 'numeric']
  },
  'second-authority-dob-year': {
    validate: ['required', 'numeric']
  },
  'second-authority-town-birth': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-authority-country-birth': {
    mixin: 'input-text',
    validate: 'required'
  },
  'first-authority-holders-nationality': {
    mixin: 'input-text',
    validate: 'required'
  },
  'first-authority-holders-nationality-multi': {
    mixin: 'checkbox',
    value: 'first-authority-holders-nationality-multi',
    toggle: 'first-authority-holders-nationality-multi',
  },
  'first-authority-holders-nationality-second': {
  },
  'first-authority-holders-nationality-third': {
  },
  'first-authority-holders-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase'
  },
  'first-authority-holders-address-lookup': {
    className: 'address'
  },
  'first-authority-holders-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'height',
      value: 6
    }]
  },
  'second-authority-holders-nationality': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-authority-holders-nationality-multi': {
    mixin: 'checkbox',
    value: 'second-authority-holders-nationality-multi',
    toggle: 'second-authority-holders-nationality-multi',
  },
  'second-authority-holders-nationality-second': {
  },
  'second-authority-holders-nationality-third': {
  },
  'second-authority-holders-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase'
  },
  'second-authority-holders-address-lookup': {
    className: 'address'
  },
  'second-authority-holders-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'height',
      value: 6
    }]
  },
  'contact-holder': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: ['first', 'second', {value: 'other', toggle: 'someone-else-name', child: 'input-text'}]
  },
  'someone-else-name': {
    validate: 'required',
    dependent: {
      field: 'contact-holder',
      value: 'other'
    }
  },
  'storage-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase'
  },
  'storage-address-lookup': {
    className: 'address'
  },
  'storage-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'height',
      value: 6
    }]
  },
  'contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'contact-phone': {
    mixin: 'input-text',
    validate: 'required'
  },
  'use-different-address': {
    mixin: 'radio-group',
    validate: 'required',
    options: [{
     value: 'false'
    }, {
      value: 'true',
      toggle: 'authority-holder-contact-postcode',
      child: 'partials/postcode-manual-link'
    }]
  },
  'authority-holder-contact-postcode': {
    validate: ['required', 'postcode'],
    formatter: 'uppercase',
    dependent: {
      field: 'use-different-address',
      value: 'true'
    }
  },
  'authority-holder-contact-address-lookup': {
    className: 'address'
  },
  'authority-holder-contact-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'height',
      value: 6
    }]
  },
  'contact-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase'
  },
  'contact-address-lookup': {
    className: 'address'
  },
  'contact-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'height',
      value: 6
    }]
  },
  'storage-add-another-address': {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  }
};
