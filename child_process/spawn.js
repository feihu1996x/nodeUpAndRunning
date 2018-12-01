// child_process.spawn()
// 是一个更加通用的方法
// 要求开发人员自己处理流和它们的回调函数
// spawn()最常见的用途
// 是用来在服务器开发中创建服务器程序的子模块
// 第一个参数是让进程去开始运行的命令
// 进程的参数以数组的形式作为第二个（可选的）参数传给spawn()

const child_process = require('child_process')

const cat = child_process.spawn('cat')

cat.stdout.on('data', (d)=>{
    console.log(d.toString())
})

cat.on('exit', ()=>{
    console.log('exit')
})

cat.stdin.write('meow')
cat.stdin.end()
