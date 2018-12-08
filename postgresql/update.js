const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'upandrunning',
})
client.connect()

const text = 'UPDATE users SET name=$1, email=$2 WHERE name=$3'
const values = ['angela', 'GSXxg5201314@outlook.com', 'angus']

client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res)
  }
  client.end()
})