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
