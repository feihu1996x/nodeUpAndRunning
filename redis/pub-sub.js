//  Redis支持发布 - 订阅(pub-sub)消息模型
//  允许发送者(发布者)往频道里添加消息
//  然后由匿名的接收者(订阅者)使用

const redis = require('redis'),
    talkativeClient = redis.createClient(),
    pensiveClient = redis.createClient()

pensiveClient.on('subscribe', (channel, count)=>{
    talkativeClient.publish(channel, 'Welcome to ' + channel)
    talkativeClient.publish(channel, 'You subscribed to ' + count + ' channels!')
})

pensiveClient.on('unsubscribe', (channel, count)=>{
    if(0 === count){
        talkativeClient.end(true)
        pensiveClient.end(true)
    }
})

pensiveClient.on('message', (channel, message)=>{
    console.log(channel + ':' + message)
})

pensiveClient.on('ready', ()=>{
    pensiveClient.subscribe('quiet channel', 'peaceful channel', 'noisy channel')
    setTimeout(() => {
        pensiveClient.unsubscribe('quiet channel', 'peaceful channel', 'noisy channel')
    }, 1000)
})