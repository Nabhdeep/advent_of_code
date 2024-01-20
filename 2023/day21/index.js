import readFile from '../helper.js';
let starting
readFile('2023/day21/input.txt')
  .then((input) => {
    input = input.filter(ele => ele && ele).map(ele => ele.split(''))
    starting = findStarting(input)
    let nxt
    // for (let i = 0; i < 328; i++) {
    //   nxt = findSteps(input, starting)
    //   starting = nxt
    // }
    // console.log('part1->', nxt.length);
    let x = [0, 1, 2]
    let y = []
    let target = (26501365 - 65) / 131
    for (let s = 0; s < (65 + (131 * 2) + 1); s++) {
      // console.log(s)
      if ((s % 131) === 65) {
        y.push(starting.length)
        console.log(s, starting.length)
      }
      if (s === 64) {
        console.log('part1->', starting.length)
      }
      nxt = findSteps2(input, starting)
      starting = nxt
    }

    console.log(x, y, target)

  })
  .catch((err) => console.log('Error in ReadFile: ', err))

const findStarting = (input) => {
  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input.length; c++) {
      if (input[r][c] === "S") {
        return [r, c]
      }
    }
  }
}


const findSteps = (input, starting) => {
  let direction = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  let q = typeof starting[0] === 'number' ? [starting] : starting
  let next_queue = []
  let currseeen = new Set()
  while (q.length > 0) {
    let [r, c] = q.shift()
    for (let [dr, dc] of direction) {
      let [ndr, ndc] = [r + dr, c + dc]
      if (ndr >= 0 && ndr < input.length && ndc >= 0 && ndc < input[0].length && input[ndr][ndc] !== '#') {
        if (currseeen.has(JSON.stringify([ndr, ndc]))) continue
        next_queue.push([ndr, ndc])
        currseeen.add(JSON.stringify([ndr, ndc]))

      }
    }
  }
  return next_queue
}


const findSteps2 = (input, starting) => {
  let direction = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  let q = typeof starting[0] === 'number' ? [starting] : starting
  let next_queue = []
  let currseeen = new Set()
  let numRows = input.length
  let numCols = input[0].length

  while (q.length > 0) {
    let [r, c] = q.shift()
    for (let [dr, dc] of direction) {
      let ndr = r + dr
      let ndc = c + dc
      let rdr = wrap(ndr, numRows)
      let rdc = wrap(ndc, numCols)
      if (input[rdr][rdc] !== '#') {
        if (currseeen.has(JSON.stringify([ndr, ndc]))) continue
        next_queue.push([ndr, ndc])
        currseeen.add(JSON.stringify([ndr, ndc]))

      }
    }
  }
  return next_queue
}
const wrap = (x, max) => ((x % max) + max) % max;
