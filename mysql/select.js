const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'test',
    password: '*3!0CcEf',
    database: 'upandrunning',
})

db.connect()

db.query('SELECT * FROM users', (error, results, fields)=>{
    if(error){
        throw error
    }else{
        console.log(results)
    }
})

db.end()
