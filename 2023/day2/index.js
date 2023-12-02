import readFile from "../helper.js"

let target = {
  'red': 12,
  'green': 13,
  'blue': 14
}


readFile('2023/day2/input.text').then((data) => {
  let res = 0
  for (let i = 0; i < data.length; i++) {
    try {
      res += convertStringToMapPart2(data[i])

    } catch (error) {
      console.log(`Error ${error}`)
    }
  }
  console.log(res)
  return res
}).catch((error) => {
  console.log(`Error in functions ${error}`)
})


const convertStringToMap = (line, idx) => {
  let obj = []
  let res = {}
  if (!line) {
    throw ('false')
  }
  let s = line.split(':')[1].split(';')
  s.forEach(element => {
    let color, count;
    let colorItems = element.split(', ');
    colorItems.forEach((colorElement, index) => {
      let temp = {}
      if (index == 0) {
        [count, color] = colorElement.slice(1,).split(' ');
      } else {
        [count, color] = colorElement.split(' ');
      }
      if (target[color] < parseInt(count)) throw ('false')
    });
  });
}





const convertStringToMapPart2 = (line, idx) => {
  let obj = {
    'blue': 0,
    'green': 0,
    'red': 0
  }
  if (!line) {
    throw ('false')
  }
  let s = line.split(':')[1].split(';')
  s.forEach(element => {
    let color, count;
    let colorItems = element.split(', ');
    colorItems.forEach((colorElement, index) => {
      if (index == 0) {
        [count, color] = colorElement.slice(1,).split(' ');
      } else {
        [count, color] = colorElement.split(' ');
      }
      if (obj[color] < parseInt(count)) obj[color] = parseInt(count)
    });
  });
  return Object.values(obj).reduce((acc, currVal) => acc * currVal, 1);
}

