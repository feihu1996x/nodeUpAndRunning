const Sequelize = require('sequelize')

const db = new Sequelize('upandrunning', 'test', '*3!0CcEf', {
    host: 'localhost',
    dialect: 'mysql',
})

// 定义author模型
const Author = db.define('author', {
    name: Sequelize.STRING,
    biography: Sequelize.TEXT,
})

// 定义book模型
const Book = db.define('book', {
    name: Sequelize.STRING,
})

//  定义author和book之间一对多的关系
Author.hasMany(Book)

// 将模型与真实的数据库进行同步
db
.sync({
    force: true,
})
.then(()=>{
    // 创建并保存一个Book实例
    return Book
    .create({
        name: 'Through the Storm',
    })
})
.then((book)=>{
    // 创建并保存一个Author实例
    return Author
    .create({
        name: 'Lynne Spears',
        biography: 'Author and mother of Britney',
    })
    .then((record)=>{
        //  建立author和book之间的关系
        record.setBooks([book])
   })
})
.catch((error)=>{
    console.log(error)
})