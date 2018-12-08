const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'upandrunning',
})
client.connect()

const text = 'DELETE FROM users WHERE name = $1'
const values = ['angela']

client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res)
  }
  client.end()
})