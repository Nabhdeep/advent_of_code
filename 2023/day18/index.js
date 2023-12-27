import readFile from '../helper.js';

readFile('2023/day18/input.txt')
   .then((input) => {
      input = input.map(ele => ele.split(' '))
      part1(input)
   })
   .catch((err) => console.log('Error in ReadFile: ', err))


let directions = {
   'U': [-1, 0],
   'D': [1, 0],
   'R': [0, 1],
   'L': [0, -1],
}

const part1 = (input) => {
   let curr = [0, 0]
   let points = [[0, 0]]
   let exiternalPoints = 0
   input = input.filter(ele => ele.length > 1)
   for (let [_, val] of input.entries()) {
      let [d, f, hex] = val //commnet 
      // let [dir, num, hex] = val //PART 1 uncomment and nextline comment 
      let [dir, num] = decodeHex(hex)
      let [dr, dc] = directions[dir]
      // console.log(numDir, dir)
      exiternalPoints += parseInt(num)
      let [ndr, ndc] = [curr[0] + dr * num, curr[1] + dc * num]
      points.push([ndr, ndc])
      curr = [ndr, ndc]
   }
   // console.log(points.length)
   shoelace(points, exiternalPoints)
}

const shoelace = (arr, exiternalPoints) => {
   let a = 0
   for (let [idx, val] of arr.entries()) {
      // console.log(val)
      let [x, y] = val
      // console.log((arr[idx + 1] ? arr[idx + 1][1] : 0), (arr[idx - 1] ? arr[idx - 1][1] : 0))
      a += x * ((arr[idx + 1] ? arr[idx + 1][1] : 0) - (arr[idx - 1] ? arr[idx - 1][1] : 0))
   }
   a = Math.abs(a / 2)
   let i = a - (exiternalPoints / 2) + 1
   // console.log('Area internal Points',a)
   // console.log('exiternalPoints' , exiternalPoints)
   // console.log('Area i = A-e/2-1' , a -(exiternalPoints/2)+1)
   console.log(i + exiternalPoints)
}


const decodeHex = (hex) => {
   let directionsNum = {
      '3': "U",
      '1': 'D',
      '2': 'L',
      '0': 'R',
   }
   hex = hex.replace(/\W/g, '')
   let hexCode = hex.slice(0, hex.length - 1)
   let dir = directionsNum[hex[hex.length - 1]]
   return ([dir, parseInt(hexCode, 16)])
}
