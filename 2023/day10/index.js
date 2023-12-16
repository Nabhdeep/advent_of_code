import readFile from '../helper.js';

readFile('2023/day10/input.text').then((data) => {
  data = data.filter(ele => ele && ele).map(ele => ele.split(''))
  let startingPostion = findS(data)
  let seen = bfs(startingPostion, data)
  console.log("BFS=>>>", Math.round(seen.length / 2))
  let newData = reGrid(seen, data)
  console.log('PART2=>>', rayCastingAlog(newData))
}).catch((err) => {
  console.log('Error in readFile', err)
})

function findS(data) {
  let sr, sc;
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
      if (data[r][c] === 'S') {
        sr = r
        sc = c
        break;
      }
    }
    if (sr && sc) break
  }
  return getStrCoordinate(sr, sc)
}



function bfs(start, grid) {
  let seen = [start]
  let queue = [getNumCoordinate(start)]
  while (queue.length > 0) {
    let r = queue.shift()
    let c = r[1]
    r = r[0]
    let ch = grid[r][c]
    if (r > 0 && "S|JL".includes(ch) && "|7F".includes(grid[r - 1][c]) && !seen.includes(getStrCoordinate(r - 1, c))) {
      seen.push(getStrCoordinate(r - 1, c))
      queue.push([r - 1, c])
    }
    if (r < grid.length - 1 && "S|7F".includes(ch) && "|JL".includes(grid[r + 1][c]) && !seen.includes(getStrCoordinate(r + 1, c))) {
      seen.push(getStrCoordinate(r + 1, c))
      queue.push([r + 1, c]);
    }
    if (c > 0 && "S-7J".includes(ch) && "-LF".includes(grid[r][c - 1]) && !seen.includes(getStrCoordinate(r, c - 1))) {
      seen.push(getStrCoordinate(r, c - 1))
      queue.push([r, c - 1])
    }
    if (c < grid[0].length - 1 && "S-LF".includes(ch) && "-7J".includes(grid[r][c + 1]) && !seen.includes(getStrCoordinate(r, c + 1))) {
      seen.push(getStrCoordinate(r, c + 1))
      queue.push([r, c + 1])
    }
  }
  return seen
}









function getStrCoordinate(i, j) {
  return (i.toString() + ',' + j.toString())
}

function getNumCoordinate(str) {
  return str.split(',').map(ele => parseInt(ele))
}




function reGrid(seen, data) {
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
      if (!seen.includes(getStrCoordinate(r, c))) {
        data[r][c] = '.'
      }
    }
  }
  return data
}


function rayCastingAlog(data) {
  let score = 0
  for (let line of data) {
    let inside = 0
    let crossing = 0
    for (let ch of line) {
      switch (ch) {
        case '.':
          if (crossing % 2 != 0) {
            inside += 1
          }
          break;
        case '|':
          crossing += 1
          break;
        case 'F':
          crossing += 1
          break;
        case '7':
          crossing += 1
          break;
        case 'L':
          break;
        case '-':
          break;
        case 'J':
          break;
      }
    }
    score += inside

  }
  return score
}
