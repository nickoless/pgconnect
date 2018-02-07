const settings = require("./settings"); // settings.json

const query = `${process.argv[2]}`

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex('famous_people')
.returning('id', 'first_name')
.insert({first_name: 'Mickey', last_name: 'Mouse', birthdate: '1950-12-12'}).asCallback(function(err, rows){
  if (err) return console.error(err);
  console.log(rows)
});


// knex SQL query
knex.select('*').from('famous_people')
.asCallback(function(err, rows) {
  if (err) return console.error(err);

console.log(rows)
    });
