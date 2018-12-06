// 使用MongoDB的时候
// 不需要像关系数据库那样定义数据的结构
// 每当需求变更或者需要保存新的信息时
// 只要把包含新信息的记录保存进去
// 就能马上查询使用了

// Mongoose的作用在于
// 它使用了人可读的结构描述
// 提供了简洁的数据库交互接口

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let maxConnectTimes = 0

// 定义schema

const AuthorSchema = new Schema({
    name: {
        first: String,
        last: String,
        full: String,
    },
    contact: {
        email: String,
        twitter: String,
        google: String,
    },
    photo: String
})

const CommentSchema = new Schema({
    commenter: String,
    body: String,
    posted: String,
})

const ArticleSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'AuthorSchema'
    },
    title: String,
    contents: String,
    published: Date,
    comments: [
        CommentSchema,
    ]
})

const Author = mongoose.model('Author', AuthorSchema)
const Article = mongoose.model('Article', ArticleSchema)

mongoose.connect('mongodb://127.0.0.1:27017/upandrunning', {
    useNewUrlParser: true
})
mongoose.connection.on('disconnect', ()=>{
    maxConnectTimes++;
    if(maxConnectTimes < 5){
        Mongoose.connect(db, { useNewUrlParser: true });
    }else{
        throw new Error("数据库挂了~");
    }
})
mongoose.connection.on('error', (err)=>{
    maxConnectTimes++;
    if(maxConnectTimes < 5){
        Mongoose.connect(db, { useNewUrlParser: true });
    }else{
        throw new Error("数据库连接出错了~");
    }
})
mongoose.connection.on('open', ()=>{
    console.log('MongoDB connected');
})

// 在数据库里保存了一条作者信息
new Author({
    name: {
        first: 'angus',
        last: 'charles',
        full: 'angus charles',
    },
    contact: {
        email: 'gsx0312@qq.com',
    } 
}).save((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Author saved')
    }
    // 查询数据库把所有作者在屏幕上打印出来
    Author.find((err, doc)=>{
        console.log(doc)
        mongoose.disconnect()
    })
})

//  使用Mongoose的时候
//  不需要自己维护MongoDB的连接
//  所有的结构定义和查询都会被缓存起来
//  直到真的连接使用
