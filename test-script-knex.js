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

function getData(element) {
    const id = element.id;
    const firstName = element.first_name;
    const lastName = element.last_name;
    const year = (element.birthdate).getFullYear();
    const month = (element.birthdate).getMonth();
    const day = (element.birthdate).getDate();
  
    console.log(id + ": " + firstName + " " + lastName + ", " + "born " + "'" + year + "-" + month + "-" + day + "'")
  };

// knex SQL query
knex.select('*').from('famous_people')
.where('first_name', '=', query)
.orWhereIn('last_name', '=', query)
.asCallback(function(err, rows) {
  if (err) return console.error(err);

// function to return data
    rows.forEach(getData)
    });
