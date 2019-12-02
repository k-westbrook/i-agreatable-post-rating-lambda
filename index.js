var { Client } = require('pg')
const client = new Client({
  host: process.env.HOST_REFERENCE,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD_REFERENCE,
  database: process.env.DATABASE_NAME
});

client.connect();

exports.handler = async function (event) {
  try {

    let results = await client.query(`INSERT INTO public."rating"(
      restaurant_id, rating)
      VALUES (${event.restaurant_id},'${event.rating}')
      RETURNING rating_id;`);

    let response =
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      status: 200,
      body: results.rows
    };
    return response;

  } catch (err) {
    return err;
  }
}
