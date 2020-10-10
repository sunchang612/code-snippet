/**
 * Promise 限制并发数
*/

class Scheduler {
  constructor(props) {
    // 并发次数
    this.count = props.count || 2
    // 创建一个队列集合 
    this.queue = []
    this.runCount = 0
  }

  add(task) {
    this.queue.push(task)
  }

  start() {
    for (let i = 0; i < this.count; i++) {
      this.request()
    }
  }

  request() {
    // 如果没有队列，或在执行数量超过并发数，直接返回
    if (!this.queue.length || this.runCount >= this.count) return
    this.runCount ++
    // 每次取出数组中的第一个执行
    this.queue.shift()().then(() => {
      // 每次执行完成一个要减去 1
      this.runCount --
      this.request()
    })

  }
}

// 创建 promise 返回一个 timeout 用来控制间隔执行时间
let times = null
const timeout = time => new Promise(resolve => {
  times = setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)

// 添加任务
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => {
    clearTimeout(times)
  }))
}

addTask(1000, 1)
addTask(1000, 2)
addTask(1000, 3)
addTask(1000, 4)
scheduler.start()


