Firearms Licensing Application
------------------------------
Firearms Licensing Application built using HOF (Home Office Forms) framework.


## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

You will need to set the following envs to run this application:
```
NOTIFY_KEY                     | Your GOV.UK notify key
TEMPLATE_MUSEUM                | GOV.UK notify template ID
TEMPLATE_SECTION5              | GOV.UK notify template ID
TEMPLATE_SHOOTING_CLUB         | GOV.UK notify template ID
TEMPLATE_SUPPORTING_DOCUMENTS  | GOV.UK notify template ID email
EMAIL_REPLY_TO_DEFAULT         | Default 'reply to'  email address
CASEWORKER_EMAIL               | Caseworker email
AWS_EXPIRY_TIME                | AWS config
AWS_USER                       | AWS credentials
AWS_PASSWORD                   | AWS credentials
AWS_REGION                     | AWS config
AWS_SIGNATURE_VERSION          | AWS config
FROM_ADDRESS                   | the sender/reply address for your emails
ICASEWORK_DB                   | Icasework database name
ICASEWORK_KEY                  | Icasework key
ICASEWORK_SECRET               | Icasework secret
ICASEWORK_URL                  | Icasework url
KEYCLOAK_TOKEN_URL             | The url of the keycloak server
KEYCLOAK_CLIENT_ID             | The client name used to authenticate with keycloak
KEYCLOAK_SECRET                | The secret used to authenticate with the keycloak client
KEYCLOAK_USERNAME              | Administrator username to authenticate with the keycloak client
KEYCLOAK_PASSWORD              | Administrator password used to authenticate with the keycloak client
PDF_CONVERTER_URL              | The url that the html-pdf-converter service is running on
FILE_VAULT_URL                 | The url that the file-vault service is running on
```
Firearms uses the following microservices which will need to be run locally:
- [File-vault](https://github.com/UKHomeOffice/file-vault)
- [Html-pdf-converter](https://github.com/UKHomeOffice/html-pdf-converter)

Run the application:
```bash
$ cd firearms
$ yarn install
$ yarn run dev
```
Then visit: [http://localhost:8080/](http://localhost:8080/) and add the pathname for the desired journey. e.g. [http://localhost:8080/museums](http://localhost:8080/museums)


## Install & Run the Application locally with Docker Compose

You can containerise the application using [Docker](https://www.docker.com). The `.devcontainer` directory includes a `docker-compose.dev.yml` file for orchestrating multi-container application.

### Prerequisites

   - [Docker](https://www.docker.com)

### Setup

By following these steps, you should be able to install and run your application using a Docker Compose. This provides a consistent development environment across different machines and ensures that all required dependencies are available.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

3. Open a terminal, navigate to the project directory and run: `docker compose -f .devcontainer/docker-compose.dev.yml up -d`

4. Once the containers are built and started, you can go inside the app container: `docker exec -it devcontainer-hof-firearms-app-1 sh` (note: Docker containers may be named differently)

5. Run the necessary commands to install dependencies `yarn` and `yarn dev` to start your application.

## Install & Run the Application locally with VS Code Dev Containers

Alternatively, if you are using [Visual Studio Code](https://code.visualstudio.com/) (VS Code), you can run the application with a [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

The `.devcontainer` folder contains the necessary configuration files for the devcontainer.

### Prerequisites
   - [Docker](https://www.docker.com)
   - [VS Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention

### Setup

By following these steps, you should be able to run your application using a devcontainer in VS Code. The Dev Containers extension lets you use a Docker container as a full-featured development environment. This provides a consistent development environment across different machines and ensures that all required dependencies are available. A `devcontainer.json` file in this project tells VS Code how to access (or create) a development container with a well-defined tool and runtime stack.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention in VS Code. This extension allows you to develop inside a containerised environment.

3. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

4. Run the `Dev Containers: Open Folder in Container...` command from the Command Palette (F1) or click on the Remote Indicator (≶) in the status bar. This command will build and start the devcontainer based on the configuration files in the `.devcontainer` folder.

5. Once the devcontainer is built and started, you will be inside the containerised environment. You can now work on your project as if you were working locally, but with all the necessary dependencies and tools installed within the container.

6. To start the application, open a terminal within VS Code by going to `View -> Terminal` or by pressing `Ctrl+backtick`. In the terminal, navigate to the project directory if you're not already there.

7. Run the necessary commands to install dependencies `yarn` and `yarn dev` to start your application.

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
