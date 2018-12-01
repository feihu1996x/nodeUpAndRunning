process.on('uncaughtException', (e)=>{
    // 捕获所有异常
    console.log(e)
})

process.nextTick(()=>{
    console.log('tick')
})

process.nextTick(()=>{
    // 每次调用nextTick()的时候，
    // 回调函数都是在隔离中创建的
    // 回调函数中的代码异常会被捕获
    // 回调函数不再继续往下执行
    // 但不影响下一个nextTick()中的回调函数正常执行
    iAmAMistake()
    console.log('tock')
})

process.nextTick(()=>{
    console.log('tick tock')
})