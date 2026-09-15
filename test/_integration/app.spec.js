'use strict';

const request = require('supertest');

const baseUrl = process.env.INTEGRATION_BASE_URL;

describe('Application integration', () => {
  describe('health', () => {
    it('reports the application is running', () => {
      return request(baseUrl)
        .get('/healthz/ping')
        .expect(200);
    });

    it('reports the application is ready', () => {
      return request(baseUrl)
        .get('/healthz/readiness')
        .expect(200);
    });
  });

  describe('museums journey', () => {
    it('checks cookie support when entering the journey', () => {
      return request(baseUrl)
        .get('/museums')
        .expect(302)
        .expect('location', '/museums?hof-cookie-check');
    });

    it('redirects to and renders the privacy page after the cookie check', () => {
      return request.agent(baseUrl)
        .get('/museums')
        .redirects(2)
        .expect(200)
        .expect(response => {
          expect(response.text).to.include('Privacy Notice');
        });
    });
  });

  describe('CI mock APIs', () => {
    it('returns a matching postcode result', () => {
      return request(baseUrl)
        .get('/api/postcode-test')
        .query({postcode: 'CR0 2EU'})
        .expect(200)
        .expect('content-type', /json/)
        .expect(response => {
          expect(response.body).to.deep.equal([{
            formatted_address: '49 Sydenham Road\nCroydon\nCR0 2EU',
            postcode: 'CR0 2EU'
          }]);
        });
    });

    it('returns no result for an unknown postcode', () => {
      return request(baseUrl)
        .get('/api/postcode-test')
        .query({postcode: 'UNKNOWN'})
        .expect(200)
        .expect([]);
    });
  });
});
