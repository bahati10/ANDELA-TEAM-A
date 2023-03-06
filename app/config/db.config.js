module.exports = {
  development: {
    url: "postgres://postgres:test123@127.0.0.1:5432/teamadb",
    options: {
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },


  testing: {
    url: "postgres://postgres:test123@127.0.0.1:5432/testdb",
    options: {
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },


  production: {
    url: "postgres://postgres:test123@127.0.0.1:5432/production",
    options: {
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  }
};