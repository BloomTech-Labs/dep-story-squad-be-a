var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    pool: {
      min: 2,
      max: 10,
    },
    connection: process.env.DATABASE_URL,
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },
};

// // // Update with your config settings.

// module.exports = {

//   development: {
//     client: 'pg',
//     connection: {
//       filename: './dev.sqlite3'
//     },
//     migrations: { directory: './data/migrations' }
//   },

//   staging: {
//     client: 'pg',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './data/migrations',
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'pg',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './data/migrations',
//       tableName: 'knex_migrations'
//     }
//   }

// };
