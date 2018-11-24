const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const app = express();
const tweets = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".ejs", ejs.__express);
app.set('view engine', 'ejs');

// 中间件是指一小段特定的代码，
// 位于原始请求事件与我们给指定的路由之间
// 通过中间件可以对一些通用功能进行代码重用
// 如用户授权或者log记录

// 使用中间件把客户端POST的数据转换成
// 能够使用的JavaScript对象

// use body-parsing middleware to populate req.body
// for parsing application/json
app.use(bodyParser.json());

// use body-parsing middleware to populate req.body
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// JavaScript所有的事件触发都是在事件循环中,
// 除非我们已经完成了这次循环中的所有处理函数，
// 否则新的事件是不会被触发调用的
// 除非我们已经把文件中所有的初始化代码执行完,
// 否则不会调用request 事件
//（从而也就不会调用相应的处理函数）

// app.listen()函数调用是异步的
// 因为绑定TCP端口也需要花时间
app.listen(8000, ()=>{
    console.log("Server running at http://127.0.0.1:8000");
});

// 只响应URL为“/”的GET请求
app.get('/', function(req, res){
    let title = 'Angus',
        header = 'Welcome To Node Twitter!'
    
    // res.send('Welcome To Node Twitter!');

    // 调用res.render()函数来渲染一个模版
    // 第一个参数是我们想要渲染的模版的名字，
    // 无论index模版渲染成什么样子，
    // 它都会放入layout模版中body变量所在的位置；
    // 传给res.render() 的第二个参数是配置对象，
    // 配置对象中的locals属性包含了需要渲染此模版的数据。
    res.render('index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            'stylesheets': ['/public/style.css'],
        },
    });
});

// 通过app.get()和app.post()指定的事件监听器是同步的
app.post('/send', function(req, res){
    if(req.body && req.body.tweet){
        tweets.push(req.body.tweet);
        if(acceptsHtml(req.headers['accept'])){
            // 请求来源是浏览器
            // 重定向到/去
            // 返回302状态码
            res.redirect('/', 302);
        }else{
            // 如果传给res.send()一个对象
            // 它会自动把其序列化为JSON并添加对应的HTTP头
            res.send({
                status: "OK",
                message: "Tweet received",
            });
        }
    }else{
        // 没有tweet？
        res.send({
            status: "error",
            message: "No tweet received",
        });
    }
});

app.get('/tweets', function(req, res){
    res.send(tweets);
});


function acceptsHtml(header) {
    // 检查accept头是否包含text/html的小函数
    // 从而区分请求来源是浏览器还是API
    var accepts = header.split(',')
    for(i=0;i<accepts.length;i+=0) {
        if (accepts[i] === 'text/html') {
            return true
        }
    }
    return false
}