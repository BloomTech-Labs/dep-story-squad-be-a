# Story Squad back end and API

> **Disclaimer:** This is not a production version yet.

## Requirements

- [Labs Engineering Standard requirements found here](https://labs.lambdaschool.com/topics/node-js/)

## API doc

All routes can be viewed in the [/documentation/APIDOCS.md](./documentation/APIDOCS.md) file

## DB doc

Table info can be viewed in the [/documentation/DBDOCS.md](./documentation/DBDOCS.md) file

## Getting Started -- DEPRECATED

- These setup steps were included in the project scaffold, but should no longer be necessary.

- Install [docker](https://docs.docker.com/get-docker/) for your platform
- Fork and clone the repo to install it as your own remote.

  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Repository.
  - Alternatively you can clone this repo then remove the git folder to initialize a new repo

    ```bash
    > git clone --depth=1 --branch=master git@github.com:Lambda-School-Labs/labs-api-starter.git NEW-REPO-NAME
    > rm -rf ./NEW-REPO-NAME/.git
    ```

- run: `npm install` to download all dependencies.
- run: `docker-compose up` to start up the postgresql database.
- run: `npm run knex -- migrate:latest` to create the starting schema.
- run: `npm run knex -- seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm start` to start your local development server.

## Environment Variables for Dev/Testing

>`PORT=8000`<br>
>`PG_CONNECTION_STRING=postgres://docker:docker@127.0.0.1:5400/api-dev`<br>
>`NODE_ENV="testing"`<br>
>`BASE_URL="https://localhost:8000"`<br>
>`SESSION_SECRET="another secret"`

Okta, PostgreSQL, etc. environment variables should not be included in this readme or repo.

## Contributing

### ESLint and prettier

[ESLint](https://eslint.org/) and [prettier](https://prettier.io/) are already
configured with Lambda Labs standards and ready to go. These must be ran from
the CLI prior to commiting code in the following ways:

- `npm run lint` to view all purposed fixes.
- `npm run lint:fix` to apply fixes to eslint issues.
- `npm run format` to apply the standards defined by eslint/prettier config.

Alternatively you can install plugins for your editor of choice.
