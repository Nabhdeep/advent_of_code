import readFile from '../helper.js'

readFile('2023/day4/input.text')
  .then((data) => {
    let res = 0
    let arrMap = {}
    for (let d = 1; d < data.length; d++) {
      arrMap[d] = 1
    }
    // console.log(arrMap)
    for (let d = 0; d < data.length - 1; d++) {
      let [winningDemo, cardsDemo] = data[d].split('|')
      let winning = winningDemo.split(':')[1].split(' ').filter((ele) => ele && ele)
      let cards = cardsDemo.split(' ').filter((ele) => ele && ele)
      // console.log(winning, cards)
      let intr = checkInterseciton(winning, cards)
      // console.log(intr.length, intr)
      res = res + (intr.length > 0 ? 2 ** (intr.length - 1) : 0)   //this is soultion for part One
      for (let i = 1; i <= intr.length; i++) {
        arrMap[`${d + 1 + i}`] += arrMap[`${d + 1}`]
      }
      // break
    }
    console.log(Object.values(arrMap).reduce((acc, val) => acc + val))
    console.log(res)
  }).catch((err) => {
    console.log(`Erro in readFile ${err}`)
  })


const checkInterseciton = (w, c) => {
  return w.filter(ele => c.includes(ele));
}

