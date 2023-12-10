import readFile from '../helper.js';
let wordMap = {}
let endsWithA = []
readFile('2023/day8/input.text').then((data) => {
  data = data.filter((ele) => ele && ele)
  let rule = ''
  for (let r of data[0]) {
    rule += r === 'L' ? 0 : 1
  }
  data = data.slice(1,);
  data.forEach((ele) => {
    let s = ele.split(' = ')
    let a = s[1].slice(1, -1).split(', ')
    wordMap[s[0]] = a
    s[0].match(/(\d|\w)(\d|\w)A/g) && endsWithA.push(s[0])

  })
  let arrSteps = []
  // console.log(wordMap, rule)
  // findSteps(rule, wordMap)
  endsWithA.forEach((ele) => {
    arrSteps.push(findSteps2(wordMap, ele, rule))
  })
  console.log(lcm(...arrSteps))
})

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};




function findSteps(rule, wordMap) {
  let key = 'AAA'
  let r = 0
  let steps = 0
  while (true) {
    r = rule[steps % rule.length]
    steps++
    let val = wordMap[key]
    if (val[r] === 'ZZZ') {
      break
    }
    key = val[r]
  }

  console.log(steps)
  return steps
}

function findSteps2(wordMap, word, rule) {
  let steps = 0
  let key = word
  let r;
  while (true) {
    r = rule[steps % rule.length]
    steps++
    let val = wordMap[key]
    if (val[r].match(/(\d|\w)(\d|\w)Z/g)) {
      break
    }
    key = val[r]
  }
  return steps
}
