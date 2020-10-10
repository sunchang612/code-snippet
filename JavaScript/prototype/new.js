/**
 * 实现 new 关键字
 * 
 * new 都实现了哪些功能
 * 1. 生成一个新的对象
 * 2. 将构造函数的 prototype 赋值给新对象的 __proto__ 上
 * 3. 改变 this 的指向
 * 4. 返回新对象
 */

function cloneNew(fn, ...params) {
  const obj = Object.create(fn.prototype)
  const res = fn.apply(obj, params)
  return res instanceof Object ? res : obj
}
// or 
function myNew(fn, ...arg) {
  let obj = {}
  obj.__proto__ = fn.prototype
  const res = fn.apply(obj, arg)
  return res instanceof Object ? res : obj
}


// test

function Test(age, name) {
  this.age = age
  this.name = name
  this.say = function() {
    console.log('age ->'+ this.age + ' ,name--->' + this.name)
  }
}

Test.prototype.space = function() {
  console.log('age------->', this.age)
}

const Test1 = new Test('10', 'test1')
Test1.say()
Test1.space()
console.log(Test1)

const Test2 = new cloneNew(Test, '10', 'test1')
Test2.say()
Test2.space()
console.log(Test2)


