Firearms Licensing Application
------------------------------
Firearms Licensing Application built using HOF (Home Office Forms) framework.


## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

```bash
$ cd firearms
$ yarn install
$ yarn run start:dev
```
Then visit: [http://localhost:8080/](http://localhost:8080/) and add the pathname for the desired journey. e.g. [http://localhost:8080/museums](http://localhost:8080/museums)

## Testing

### Acceptance Tests
First, make sure the `env`variable in the config.js file is equal to `'ci'`.
With the server running in development mode run (`yarn run start:acceptance`) to start the acceptance tests:

```bash
$ npm run test:acceptance
```

### Unit Tests
```bash
$ yarn test:unit 
```
