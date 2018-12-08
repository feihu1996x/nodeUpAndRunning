const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'upandrunning',
    password: 'postgres',
    port: 5432,
})
client.connect()

const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['angus', 'gsx0312@qq.com']

client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    // { id: 1, name: 'angus', email: 'gsx0312@qq.com' }
  }
  client.end()
})