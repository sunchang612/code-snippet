export default function add(a, b) {
  let i = a.length - 1
  let j = b.length - 1
  // 记录进位
  let carry = 0
  let res = ''
  // 个位数+个位数 十位数 + 十位数
  while(i >= 0 || j >= 0) {
    let x = 0
    let y = 0
    let sum
    if (i >= 0) {
      // string 转成 number
      x = a[i] - '0'
      i --
    }
    if (j >= 0) {
      y = b[j] - '0'
      j --
    }
    // 每次求和必须要把进位加上
    sum = x + y + carry
    // 如果 sum >= 10 进位 = 1， sum - 10
    if(sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    res += sum
  }
  // 最后判断一下有没有进位
  if (carry) {
    res += carry
  }
  return res
}

console.log(add('1000000000000000000000000', '1'))