module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/avalanches",
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  }
};
