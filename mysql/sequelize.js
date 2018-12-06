const Sequelize = require('sequelize')

const db = new Sequelize('upandrunning', 'test', '*3!0CcEf', {
    host: 'localhost',
    dialect: 'mysql',
})

//  定义author模型
//  包含name字段和biograph字段
//  Sequelize自动添加了一个自增的主键字段、createdAt字段和updatedAt字段
const Author = db.define('author', {
    name: Sequelize.STRING,
    biography: Sequelize.TEXT,
})

//  同步真实数据库
Author
.sync()
.then(()=>{
    console.log('Author table was created')
    db.close()
})
.catch((error)=>{
    console.log(error)
})
