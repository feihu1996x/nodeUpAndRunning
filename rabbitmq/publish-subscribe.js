// RabbitMQ 使用标准的 AMQP 协议进行通信
// AMQP 提供了对厂商中立的抽象规范
// 可以提供通用的(不只针对金融行业的)消息中间件服务
// 并且旨在解决不同类型系统间通信的问题

//  建立一个到RabbitMQ消息代理的连接
//  默认情况(依照AMQP协议)是localhost的5672端口
const connection = require('amqp').createConnection()

connection.on('ready', ()=>{
    console.log('Connected to RabbitMQ')

    //  指定 up-and-running 作为 exchange 的名字
    //  让当前程序与运行在同一台服务器上的其他 exchange 隔离开
    //  exchange 是负责接收消息并把它们传递给绑定的队列的实体
    var e = connection.exchange('up-and-running')

    var q = connection.queue('up-and-running-queue')

    q.on('queueDeclareOk', (args)=>{
        console.log('Queue opened')

        //  队列自己并不会做任何操作
        //  它必须绑定到某个 exchange 之后才能进行其他操作
        //  把名为up-and-running-queue的队列添加到名为up-and-running的exchange上
        //  让 exchange 监听所有传给队列的消息(通过 '#' 参数)
        //  可以把#改为其他关键字来过滤消息
        q.bind(e, '#')

        q.on('queueBindOk', ()=>{
            console.log('Queue bound')

            //  当客户端订阅了此队列之后
            //  AMQP库会触发basicConsumeOk事件
            q.on('basicConsumeOk', ()=>{
                console.log('Consumer has subscribed, publishing message.')

                // AMQP的中心思想是发布者永远不知道哪些订阅者连接了
                // 所以需要有一个作为
                // 路由的关键词备用

                //  通过Node
                //  发布一条
                //  hello world消息以及用来过滤的关键词routingKey
                //  在这里，过滤的关键词是什么并没有关系
                //  队列绑定了所有内容(通过 bind('#') 命令)
                e.publish('routingKey', {hello:'world'})
            })
        })

        //  消息传给 exchange 并通过 queue 传输之后
        //  都会调用回调函数
        q.subscribe(function(msg){
            console.log('Message received:')
            console.log(msg)
            connection.end()
        })
    })
})