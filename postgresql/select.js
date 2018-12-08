const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'upandrunning',
  password: 'postgres',
  port: 5432,
})

pool.query('SELECT * FROM users', (err, res) => {
  console.log(err, res.rows)
  pool.end()
})

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'upandrunning',
    password: 'postgres',
    port: 5432,
})
client.connect()

client.query('SELECT * FROM users', (err, res) => {
  console.log(err, res.rows)
  client.end()
})