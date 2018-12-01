// process是EventEmitter的实例
// 它提供了基于对Node进程的系统调用的事件

// exit事件提供了在Node进程退出前的最终响应时机
// 事件循环在exit事件之后就不会再运行了
// 因此只有那些不需要回调函数的代码才会被执行
process.on('exit', function(){
    setTimeout(function(){
        // 定时器内的代码永远不会执行
        console.log('This will not run')
    }, 100)
    console.log('Bye.')
})

// 通过监听uncaughtException事件
// 全局捕获异常
process.on('uncaughtException', (err)=>{
    console.log('Caught exception: ' + err)
})

setTimeout(()=>{
    console.log('This will still run.')
}, 500)

// 故意导致异常
// 该异常会被全局监听器捕获
// 虽然Node程序不会退出
// 但是标准的执行流程会被打断
// 在它之后的代码都不会执行下去
// 在此之前已经运行的代码会继续下去
// 任何回调函数都可能在其对应监听的事件触发时被调用
nonexistentFunc()

console.log('This will not run.')