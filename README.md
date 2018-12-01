# nodeUpAndRunning

> 《Node即学即用》代码笔记

## Build Setup

```bash
# install dependencies
npm install
```

Node中的进程模块

一、Node中可以使用系统中已经存在的进程，或者创建新的子进程来做各种事件循环以外的工作
二、process模块
1. 可以使用process模块从当前的Node进程获得信息，并可以修改配置
2. process模块是全局的，并且可以一直通过变量process获得
3. process事件
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

===

const http = require('http')

const server = http.createServer((req, res)=>{
    res.writeHead(200, {})
    res.end('response')
    // 调用了不存在的函数
    // 会触发一个异常
    // 该异常会被全局监听器捕获
    // 但该异常被封装在一个特定的代码路径上
    // 所以Node只会阻止正在运行的回调函数
    // 而服务器能够继续运行
    badLoggingCall('sent response')
    console.log('sent response')
})

process.on('uncaughtException', (e)=>{
    console.log(e)
})

server.listen(8080, ()=>{
    console.log('Server running at http://127.0.0.1:8080')
})

===

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
4. 与当前Node进程进行交互
// process包含了有关Node进程的许多元信息
// 包括关于Node进程的若干不可改变（只读）的信息

// 正在运行的Node的版本号
console.log(process.version)

// 正在运行的平台名称(会指明内核)
console.log(process.platform)

// 当前进程的运行时间
console.log(process.uptime())

// 进程都是按某个特定的用户及用户组启动的
// 可以调用process.getgid()
// process.setgid()
// process.getuid()
// process.setuid()
// 来获得或修改这些属性
// 其中
// set方法除了可以接受用户名/用户组所对应的数字ID外
// 还可以直接使用用户组/用户名本身
// 如果传入的是用户组或用户名
// 该方法会采取堵塞的方式来把这个信息翻译成ID
// 这样会花费些时间

// 正在运行的Node实例的进程ID
console.log(process.pid)

// 设置Node显示在系统的标题名称
// 该属性修改后的内容会在ps命令调用时显示出来
process.title = 'process'

// 当前node解释器所在的路径
console.log(process.execPath)

// 修改工作目录
// 如果修改的目录不可读或者不存在
// 将会抛出异常
process.chdir('c:/')

// 工作目录
// 默认是脚本启动的目录
console.log(process.cwd())

// 当前进程的内存使用情况
// 会返回一个对象来说明内存使用的各种情况
// rss是RAM的使用量
// heapTotal表示V8分配了多少内存
// heapUsed表示已经有多少内存正在使用
console.log(process.memoryUsage())
5. 操作系统的输入/输出
// 通过process,
// 可以访问操作系统的标准I/O流

// process.stdin
// 进程的默认输入流
// 是可读的数据流
// 在进程间通信时是非常有用的
// 它能够为命令行下采用管道通信提供便利
// 当我们输入cat file.txt | node program.js时
// 标准输入流会接收到cat命令输出的数据
// process.stdin一开始处于暂停状态
// 此时Node可以对它进行写入操作
// 但是不能从它读取内容
// 在尝试从stdin读数据之前
// 需要先调用它的resume()
// Node会为此数据流填入供读取的缓存，
// 并等待你的处理，
// 这样可以避免数据丢失
process.stdin.resume()
process.stdin.setEncoding('utf8')

// process.stdout
// 进程的默认输出流
// 是可写的数据流
process.stdin.on('data', (chunk)=>{
    // 把标准输入写到标准输出
    process.stdout.write(chunk)
})
process.stdin.on('end', ()=>{
    process.stdout.write('end')
})

// process.stdin和process。stdout都是stream
// 可以直接使用pipe方法
// 把标准输入转到标准输出
process.stdin.pipe(process.stdout)

// process.stderr
// 进程的错误输出流
// 是可写的数据流
// 用来输出异常和程序运行过程中遇到的问题
// 当写入stderr时，Node将保证该次写入的会被完成
// 和其他普通的流不一样，写入stderr会以堵塞的方式执行
// 在一个生产系统中
// 应该避免对stderr写入过多的内容
// 因为它可能会堵塞真正需要的工作
// process.stderr永远是UTF-8编码的数据流
// 不需要也不能更改编码格式

===

// process.argv是包含命令行参数的数组
console.log(process.argv)
6. 事件循环和计数器
const http = require('http')

const server = http.createServer((req, res)=>{
    res.writeHead(200, {})
    res.end('foo')
    console.log('http response')
    process.nextTick(()=>{
        // 用process.nextTick()
        // 往事件循环队列里插入回调函数
        // 它会在下一个tick或者事件循环下一次迭代时被调用
        // 在这里
        // 无论我们向HTTP服务器发起多少次请求，
        // tick每次都会出现在事件循环的下一个轮回中
        console.log('tick')
    })
})

server.listen(8000, ()=>{
    console.log('Server running at http://127.0.0.1:8000')
})

===

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
三、子进程
1. Node的单进程只有一个事件循环，可以使用child_process模块来为Node主进程创建子进程，从而更好地利用多核CPU
2. child_process.exec()
// exec()会创建一个子进程
// 来运行其他程序（也可以是另外一个Node程序）
// 然后在回调函数中返回执行的结果

const child_process = require('child_process')

child_process.exec('ls -l', (error, stdout, stderr)=>{
    if(error){
        // 如果子进程返回了错误的状态码
        // 或者是有其他异常发生
        // error对象就不会是null    
        // 在Unix中，
        // 0是表示成功，
        // 大于0的8位数字则用来表示错误
        // error对象也可以用来表示
        // 被调用的命令不满足Node对它的限制
        // 当错误代码从子进程返回时，
        // error对象会包含错误代码和stderr
        console.log(error)
        console.log(stderr)
    }
    else{
        // 若一个子进程运行是成功的
        // stderr中依然可以有数据
        console.log(stdout)
        console.log(stderr)
    }
})

// child_process.exec()的第二个参数可以是一个可选的配置对象
// 默认情况下，该对象的属性如下
const options = {
    encoding: 'utf8', // I/O流输入字符的编码格式
    timeout: 0, // 进程运行的时间，以毫秒为单位
    maxBuffer: 200 * 1024, // stdout或stderr允许最大的大小，以千字节为单位
    killSignal: 'SIGTERM', // 当时间或Buffer大小超过限制时，用来终止进程的信号
    setsid: false, // 是否创建Node子进程的新会话
    cwd: null, // 为子进程初始化工作目录(null表示使用当前的进程工作目录)
    env: null, // 进程的环境变量。所有的环境变量都可以从父进程继承
}
3. child_process.spawn()
