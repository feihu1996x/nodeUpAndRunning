const assert = require('assert')
try{
    // 断言 1 == true
    // 当断言不通过时
    // 抛出错误消息为Truthy的AssertionError
    assert.equal(1, true, 'Truthy')
}catch(e){
    console.log(e)
}

try{
    // 断言 1 === true
    // 当断言不通过时
    // 抛出错误消息为Strictly Truthy的AssertionError
    assert.strictEqual(1, true, 'Strictly Truthy')
}catch(e){
    console.log(e)
}

try{
    // 断言 1 != true
    // 当断言不通过时
    // 抛出错误消息为Not Truthy的AssertionError
    assert.notEqual(1, true, 'Not Truthy')  
}catch(e){
    console.log(e)
}

try{
    // 断言1 !== true
    // 当断言不通过时
    // 抛出错误消息为Not Strictly Truthy的AssertionError
    assert.notStrictEqual(1, true, 'Not Strictly Truthy')
}catch(e){
    console.log(e)
}

try{
    // assert.ok(object, errMsg)是用来测试一个对象是否为真值的简便方法
    // 等价于assert.equal(object, true, errMsg)
    assert.ok('This is a string', 'Strings that are not empty are truthy')
    assert.ok(0, 'Zero is not truthy')
}catch(e){
    console.log(e)
}

// assert.deepEqual()和assert.notDeepEqual()
// 提供了深入比较两个对象值的方法
// 这些方法会进行若干测试
// 如果任何一个检查失败了
// 测试就会抛出异常
// 首先检查的是若用简单的===操作来比较，两个值的结果是否相等
// 接着，检查一下它们的类型是否为Buffer
// 如果是，则检查它们的长度，然后按字节对比
// 如果对象的类型按==运算符不匹配，它们就不可能相等
// 如果比较的参数是复杂数据类型，会进行更加严格的测试
// 如比较两个对象的原型、属性数量，然后对每个属性执行deepEqual()以进行递归比较

// assert.throws()断言指定的代码块会抛出异常
// assert.doesNotThrow()断言指定的代码块不会抛出异常
// 我们可以检测指定的异常或者是任意的异常是否抛出
// 要把代码块传给throws()和doesNotThrow()，需要把它们包含在一个没有参数的函数里
// 有4种方法可用来指定要检测的异常类型
// 比较函数：该函数只接收一个参数，即异常错误对象。在函数里比较传入的异常是否与你想检测的类型匹配，如果匹配则返回真，否则返回假
// 正则表达式：函数库会根据正则表达式来比较错误消息是否匹配你的要求。采用的是JavaScript的regex.test()方法
// 字符串：函数库会直接比较错误消息与指定的字符串
// 对象构造类型：函数库会用typeof来对异常进行操作并测试。如果该测试在调用typeof时抛出错误，则认为异常类型匹配

try{
    assert.throws(()=>{
        throw new Error('Seven Fingers. Ten is too mainstream')
    })
}catch(e){
    console.log(e)
}

try{
    assert.doesNotThrow(()=>{
        throw new Error('I lived in the ocean way before Nemo')
    })
}catch(e){
    console.log(e)
}