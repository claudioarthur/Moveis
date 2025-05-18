var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'grupo',
      password : 'senac1234',
      database : 'smartkids'
    }
  });

module.exports = knex