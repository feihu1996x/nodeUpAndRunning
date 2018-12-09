// 用 AMQP 处理长时间运行任务

const connection = require('amqp').createConnection()

function sleep(milliseconds){
    var start  = new Date().getTime()
    while(new Date().getTime() < start + milliseconds){}
}

connection.on('ready', ()=>{
    console.log('Connected to RabbitMQ')

    var e = connection.exchange('up-and-running')
    var q = connection.queue('up-and-running-queue')    

    q.on('queueDeclareOk', (args)=>{
        console.log('Queue opened')
        
        q.bind(e, '#')

        //  客户端从队列获取消息
        //  睡眠5秒(模仿耗时操作，相当于花了5秒钟处理这条消息)
        //  然后从队列获取下一条消息
        //  并不断重复

        //  发布者每隔1秒发送一条消息到队列
        //  订阅者要花费5秒才能处理一条消息
        //  订阅者会很快就落后于发布者
        //  此时，可以打开若干个窗口，运行若干个客户端
        //  从而可以进一步分散负载
        //  这种部署就称为工作队列
        
        q.subscribe({
            //  {ack:true}参数的作用是通知AMQP等待用户确认
            //  看该消息是否已经处理完成
            ack: true,
        }, (msg)=>{
            console.log('Message received:')
            console.log(msg.count)

            sleep(5000)

            console.log('Processed. Waiting for next message.')

            //  通知AMQP当前消息已经处理完成
            //  应答之后
            //  消息将从队列中移除
            //  同时将其从服务里拿掉
            //  如果一个工作进程在处理某个消息的过程中没有发送反馈死掉了
            //  RabbitMQ代理会把消息发给下一个可用的客户端            
            q.shift()
        })
    })
})