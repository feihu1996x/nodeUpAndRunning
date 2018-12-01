// 可以利用process来访问一些系统事件
// 操作系统会产生许多POSIX系统事件
// 最常见的有SIGINT、中断信号量
// 当用户对运行在终端的程序按下Ctrl-C的时候
// SIGINT就会发生

// 当进程得到一个信号的时候
// 它会通过process触发的事件通知Node程序
// 除非通过process来处理信号事件
// 否则Node会采取默认方法进行处理

// 从标准输入读取内容
// 所以程序不会退出
process.stdin.resume()

// 捕捉Node进程的信号量
process.on('SIGINT', ()=>{
    console.log('Got SIGINT. Press Control-D to exit.')
})