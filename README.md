# Story Squad back end and API

> **Disclaimer:** This is not a production version yet.

## Requirements

- [Labs Engineering Standard requirements found here](https://labs.lambdaschool.com/topics/node-js/)

## Demo Videos

[GoogleDrive](https://drive.google.com/drive/folders/1CRnotKkZo9K-7AGBgfniRfJlwwfySO4F?usp=sharing)

[Labs-28](https://drive.google.com/drive/folders/1k4jNKvTGx_ISCFlfBH12lGXXajWEtnED?usp=sharing)

## Contributors

| [M Groesbeck](https://github.com/MMGroesbeck)                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [<img src="https://avatars1.githubusercontent.com/u/59658087?s=460&u=8df0cdedcfab8315a6802db3412fc9c9aa9e4e07&v=4" width="200" />](https://github.com/MMGroesbeck) |
| [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MMGroesbeck)                                                                           |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/m-groesbeck/)                                       |

| [Harrison Seaborn](https://github.com/HarrisonMS)                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [<img src="https://avatars0.githubusercontent.com/u/54726103?s=460&u=8a9bb62c6871e6c533796161be184995bec7523a&v=4" width="200" />](https://github.com/harrisonMS) |
| [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/harrisonMS)                                                                           |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/harrison-seaborn/)                                 |

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

## Getting Started

- run: `npm install` to download all dependencies.
- You will need to set up a database connection for local development and establish the connection in the env under database_url <br>example-- postgresql://postgres:password@localhost/storysquad-dev
- you will also need to set up the rest of your env variables.. see labs-28 demo video for further assistance
- run: `npm run knex -- migrate:latest` to create the starting schema.
- run: `npm run knex -- seed:run` to populate your db with some data.
- run: `npm run server` to start your local development server.

## Environment Variables for Dev/Testing

> `PORT=8000`<br> >`PG_CONNECTION_STRING=postgres://docker:docker@127.0.0.1:5400/api-dev`<br> >`NODE_ENV="testing"`<br> >`BASE_URL="https://localhost:8000"`<br> >`SESSION_SECRET="another secret"`

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
