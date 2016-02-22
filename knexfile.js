module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/postgres',
    debug: false,
    pool: {
      min:0,
      max: 10
    },
    migrations:{
      tableName: 'knex_migrations',
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds/dev'
    }
  },

  staging: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/postgres',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};