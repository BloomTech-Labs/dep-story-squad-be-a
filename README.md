# Story Squad back end and API

> **Disclaimer:** This is not a production version yet.

This repository assumes a handful of industry practices and standards. We strive to keep you on the bleeding edge of the industry and as a result, we have made some opinions for you so that you don't have to; you're welcome.

Read more at <https://docs.labs.lambdaschool.com/labs-api-strarter/>

## Requirements

## Demo Videos

[GoogleDrive](https://drive.google.com/drive/folders/1CRnotKkZo9K-7AGBgfniRfJlwwfySO4F?usp=sharing)

## Contributors

| [M Groesbeck](https://github.com/MMGroesbeck) |
| --------------------------------------------- |
| [<img src="https://avatars1.githubusercontent.com/u/59658087?s=460&u=8df0cdedcfab8315a6802db3412fc9c9aa9e4e07&v=4" width="200" />](https://github.com/MMGroesbeck) |
| [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MMGroesbeck) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/m-groesbeck/) |

## API documentation

All routes can be viewed in the [/documentation/APIDOCS.md](./documentation/APIDOCS.md) file

## DB documentation

Table info can be viewed in the [/documentation/DBDOCS.md](./documentation/DBDOCS.md) file

## Tech Stack and Third-Party Services

### Node.js + Express.js
- Flexible and well-supported framework for back-end and API

### PostgreSQL
- Relational database for structured storage and retrieval of data
- Supports JSON object storage for flexible architecture
- Knex.js to build queries in JS back end

### Okta
- Third-party authentication and access management
- Transparent for end user, but adds additional security for personal information
- Account passwords are not saved to Story Squad database (not even account password hash)

### Stripe
- Third-party payment processing
- Allows offline payment processing
- Financial information is never saved to Story Squad database

## Getting Started -- DEPRECATED

- These setup steps were included in the project scaffold, but should no longer be necessary.

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DS_API_URL` - URL to a data science api. (eg. <https://ds-bw-test.herokuapp.com/>)
- `DS_API_TOKEN` - authorization header token for data science api (eg. SUPERSECRET)
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See .env.sample for example values

### Setup postgres

## Environment Variables for Dev/Testing

>`PORT=8000`<br>
>`PG_CONNECTION_STRING=postgres://docker:docker@127.0.0.1:5400/api-dev`<br>
>`NODE_ENV="testing"`<br>
>`BASE_URL="https://localhost:8000"`<br>
>`SESSION_SECRET="another secret"`

Okta, PostgreSQL, etc. environment variables should not be included in this readme or repo.

## Contributing

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
    - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
    - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
    - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
      - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
    - make note of the port, username and password you use to setup the database.
    - Connect your client to the server manually using the values previously mentioned
    - You will need to create a database manually using a client.
    - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
    - Sign up for a free `Tiney Turtle` plan
    - copy the URL to the DATABASE_URL .env variable
    - make sure to add `?ssl=true` to the end of this url

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

## Contributing

See the [contributing doc](https://github.com/Lambda-School-Labs/labs-api-starter/blob/main/CONTRIBUTING.md)
for more info.
