import readFile from '../helper.js';
let ruleMap = new Map()
let xmas = new Map()
xmas.set('x', [1, 4000])
xmas.set('m', [1, 4000])
xmas.set('a', [1, 4000])
xmas.set('s', [1, 4000])
readFile('2023/day19/input2.txt')
  .then((input) => {
    let idxOfSlice = input.indexOf('')
    let rules = input.slice(0, idxOfSlice)
    let parts = input.slice(idxOfSlice + 1,)
    // console.log(rules, parts,)
    ruleMap = getRules(rules)
    // console.log(getAllParts(parts))
    let alPart = getAllParts(parts)
    let res = 0
    for (let p of alPart) {

      // console.log('=============GOT IN HERE==============')
      let a = getParts('in', p)

      if (a) {
        for (let e of p) {
          res += parseInt(e[1])
        }
      }

    }
    console.log('Part1->', res)
    console.log('Part2->', getCombos('in', xmas))
  })
  .catch((err) => console.log('Error in ReadFile: ', err))



let p = 0

const getCombos = (key, part) => {
  if (key === 'R') {
    return 0
  }

  if (key === 'A') {
    let prod = 1
    for (let [k, v] of part.entries()) {
      prod *= (v[1] - v[0]) + 1
    }
    return prod
  }

  let rule = Array.from(ruleMap.get(key))
  let toComp;
  let oop;
  let compNum;
  let nextKey;
  let truHalf;
  let falseHalf;
  let total = 0
  for (let r of rule) {
    if (typeof r === 'object') {
      [toComp, oop, compNum, nextKey] = r
      compNum = parseInt(compNum)
      let [lo, hi] = part.get(toComp)
      if (oop === '<') {
        truHalf = [lo, Math.min(hi, compNum - 1)]
        falseHalf = [Math.max(compNum, lo), hi]
      } else {
        truHalf = [Math.max(compNum + 1, lo), hi]
        falseHalf = [lo, Math.min(hi, compNum)]
      }
      if (truHalf[0] <= truHalf[1]) {
        let copy = structuredClone(part)
        copy.set(toComp, truHalf)
        total += getCombos(nextKey, copy)
      }
      if (falseHalf[0] <= falseHalf[1]) {
        part.set(toComp, falseHalf)
      }
    } else if (typeof r === 'string') {
      total += getCombos(r, part)
    }
  }

  return total
}






const getParts = (key, part) => {
  if (key === 'A') {
    return true
  }
  if (key === 'R') {
    return false
  }
  let rule = Array.from(ruleMap.get(key))
  let toComp;
  let oop;
  let compNum;
  let nextKey;
  for (let r of rule) {
    if (typeof r === 'object') {
      [toComp, oop, compNum, nextKey] = r
      for (let [compare, num] of part) {
        if (typeof r !== 'string' && r.includes(compare)) {
          if (eval(`${num}${oop}${compNum}`)) {
            return getParts(nextKey, part)
          }
        }
      }
    } else if (typeof r === 'string') {
      return getParts(r, part)
    }
  }
}


const getRules = (rules) => {
  let ruleMap = new Map()
  for (let i = 0; i < rules.length; i++) {
    let [key, ruleWithDefault] = rules[i].split('{')
    let rule = ruleWithDefault.split(',');
    rule.forEach(element => {
      let toMatch, op, fromMatch;
      let idx, nKey
      let def, _
      if (element.includes(':')) {
        let [currRule, nextKey] = element.split(':');
        if (currRule.includes('>')) {
          idx = currRule.indexOf('>')
        } else if (currRule.includes('<')) {
          idx = currRule.indexOf('<')
        }
        [toMatch, op, fromMatch, nKey] = [currRule.slice(0, idx), currRule[idx], currRule.slice(idx + 1,), nextKey]
        // console.log([toMatch, op, fromMatch, nKey])
      } else {
        [def, _] = element.split('}')
        // console.log(ruleMap.get(key))
        ruleMap.set(key, [...ruleMap.get(key), def])
      }
      if (toMatch) {
        let pev = ruleMap.get(key) ? ruleMap.get(key) : undefined
        if (pev) {
          // console.log(pev)
          ruleMap.set(key, [...pev, [toMatch, op, fromMatch, nKey]])
        } else {

          ruleMap.set(key, [[toMatch, op, fromMatch, nKey]])
        }
      }
    })
  }
  return ruleMap
}

const getAllParts = (parts) => {
  let allParts = []
  let temp;
  parts.forEach(element => {
    temp = element.slice(1, element.length - 1).split(',')
    let curr = []
    temp.forEach((ele) => {
      curr.push(ele.split('='))

    })
    curr[0].length > 1 ? allParts.push(curr) : null
  });

  return allParts
}



