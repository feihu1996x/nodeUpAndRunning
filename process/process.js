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
