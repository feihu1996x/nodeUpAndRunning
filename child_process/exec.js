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
