import readFile from "../helper.js";
let cardMap = {}
// let power = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
let power2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
readFile('2023/day7/input.text')
  .then((data) => {
    data.forEach(element => {
      let l = element.split(' ')
      if (l.length > 1) cardMap[l[0]] = l[1]
    });
    let m = setCards(cardMap)
    let sorted = m.sort((a, b) => {
      if (a[0] === b[0]) {
        for (let i = 0; i < a[1].length; i++) {
          if (power2.indexOf(a[1][i]) < power2.indexOf(b[1][i])) return 1
          if (power2.indexOf(a[1][i]) > power2.indexOf(b[1][i])) return -1
        }
      }
      if (a[0] > b[0]) return 1
      if (a[0] < b[0]) return -1
    })
    let result = 0
    for (let i = 1; i <= sorted.length; i++) {
      result += parseInt(cardMap[sorted[i - 1][1]]) * i
    }
    console.log('Part 2-> ', result)
    // let m = setCards(cardMap)
    // console.log(m)
    // return result
  }).catch((err) => {
    console.log('Error in readFile', err)
  })


function setCards(cards) {
  let res = []
  let arrCards = Object.keys(cards)
  for (let card of arrCards) {
    // res.push([getHandType(card), card])
    res.push([getHandType2(card), card])

  }
  return res
}

function getHandType(hand) {
  let elementCounts = {}
  hand.split('').forEach(ele => {
    elementCounts[ele] = (elementCounts[ele] || 0) + 1;
  })
  let countArr = Object.values(elementCounts).sort((a, b) => a - b)
  switch (true) {
    case countArr.toString() === '5':
      return 5
    case countArr.toString() === '1,4':
      return 4
    case countArr.toString() === '2,3':
      return 3.5
    case countArr.toString() === '1,1,3':
      return 3
    case countArr.toString() === '1,2,2':
      return 2.5
    case countArr.toString() === '1,1,1,2':
      return 2
    default:
      return 1
  }
}


function getHandType2(hand) {
  let J = 0
  let elementCounts = {}
  for (let c of hand) {
    if (c === 'J') { J += 1 }
    else { elementCounts[c] = (elementCounts[c] || 0) + 1 }
  }
  let countArr = Object.values(elementCounts).sort((a, b) => a - b)

  if (J >= 5 || countArr[countArr.length - 1] + J >= 5) {
    return 5
  }
  if (J >= 4 || countArr[countArr.length - 1] + J >= 4) {
    return 4
  }
  if (countArr[countArr.length - 1] + J >= 3) {
    let leftJoker = countArr[countArr.length - 1] + J - 3
    if (countArr.length >= 2 && countArr[countArr.length - 2] + leftJoker >= 2 || leftJoker >= 2) {
      return 3.5
    }
    return 3
  }
  if (countArr[countArr.length - 1] + J >= 2) {
    let leftJoker = countArr[countArr.length - 1] + J - 2
    if (countArr.length >= 2 && countArr[countArr.length - 2] + leftJoker >= 2 || leftJoker >= 2) {
      return 2.5
    }
    return 2
  }
  return 1

}
