//  如果长时间运行的任务超出了用户的容忍度
//  比如等待一个网页加载时
//  或者是该任务会堵塞整个程序
// 使用队列就很合适

//  用 AMQP 发布长时间运行任务

const connection = require('amqp').createConnection()

let count = 0

connection.on('ready', ()=>{
    console.log('Connected to RabbitMQ')
    
    var e = connection.exchange('up-and-running')
    var q = connection.queue('up-and-running-queue')

    q.on('queueDeclareOk', (args)=>{
        console.log('Queue opened')
       
        q.bind(e, '#')
       
        q.on('queueBindOk', ()=>{
            console.log('Queue bound')

            setInterval(()=>{
                //  每隔1000毫秒
                //  往队列发布一条消息
                console.log('Publishing message #' + ++count)
                e.publish('routingKey', {count:count})
            }, 1000)
        })
    })
})