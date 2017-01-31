# Address Lookup Components

## Aims

* To have a minimal set of controllers to be reused for address lookup components.
* To reduce configuration to a minimum, without assuming internally configuration that can be changed externally - i.e. urls, field names.

## Implementation overview

A helper function has been created which takes a set of minimal configuration values and returns the fuller config for each of the three steps of an address lookup journey.

The return value of the helper function is an object with three properties: `start`, `select`, `manual`. Each of these is an object which can be used directly for step configuration or can be extended.

## Configuration

The following properties are required:

* `prefix` - prefixes the address fields into a namespace
* `start` - the url for the first (postcode input) step, with leading slash
* `select` - the url for the address selection step, with leading slash
* `manual` - the url for the manual address entry step, with leading slash
* `next` - the url for the page to be directed to following successful address entry, with leading slash

## Fields

Following a successful address entry, a field with key `${prefix}-address` will be present on the session model.
