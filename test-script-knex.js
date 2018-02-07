const settings = require("./settings"); // settings.json

let item = process.argv[2]
const terms = [`%${item}%`]

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

knex.select('*').from('famous_people')
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      console.log(rows);
    });
