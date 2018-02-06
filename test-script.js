const pg = require("pg");
const settings = require("./settings"); // settings.json

const query = `
SELECT * FROM famous_people
WHERE last_name LIKE $1::text OR first_name LIKE $1::text
`;

let item = process.argv[2]
const terms = [`%${item}%`]
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function outputResults(rows, name) {

  console.log('Found', rows.length, `person(s) by the name '${name}':`);

  rows.forEach(function (element) {
    const id = element.id;
    const firstName = element.first_name;
    const lastName = element.last_name;
    const year = (element.birthdate).getFullYear();
    const month = (element.birthdate).getMonth();
    const day = (element.birthdate).getDate();
  
  
    console.log(id + ": " + firstName + " " + lastName + ", " + "born " + "'" + year + "-" + month + "-" + day + "'")
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, terms, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
 
    outputResults(result.rows, item);
    client.end();
  });

  console.log('searching...')
});

