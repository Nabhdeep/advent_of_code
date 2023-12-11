import readFile from "../helper.js";

let arr = []
readFile('2023/day9/input.text').then((data) => {
  data = data.filter((ele) => ele && ele)
  for (let d of data) {
    arr.push(d.split(' '))
  }
  // console.log(arr)
  let result = 0
  let result2 = 0 
  arr.forEach((ele) => {
    let s = checkAllSeries(ele)
    let p = checkAllSeries2(ele)
    //console.log(s)
    result += s
    result2 +=p
  })
  console.log('PART1->>>>>', result)
  console.log('PART2->>>>>', result2)
}).catch((err) => {
  console.log('Error in readFile: ', err)
})

function checkAllSeries(arr) {

  let res = []
  let i = 0
  let j = i + 1
  let allSeries
  res.push(arr.map(ele => parseInt(ele)))

  let a = 0
  while (true) {
    allSeries = []
    i = 0
    j = i + 1
    
    if (res[res.length - 1].every(ele => ele === 0) ||res[res.length - 1].length<1 ) {break}

    while (i < j && j < res[a].length) {
      if(res[a].length>1){
        allSeries.push(res[a][j]-res[a][i])
        i = j
        j = i + 1
      }else{
        break
      }
    }
    // console.log(res)
      res.push(allSeries)

      a += 1
  }
  for (let i = res.length - 1; i > 0; i--) {
    res[i - 1].push(res[i][res[i].length - 1] + res[i - 1][res[i - 1].length - 1])
  }
  return parseInt(res[0].slice(-1))

}


function checkAllSeries2(arr) {

  let res = []
  let i = 0
  let j = i + 1
  let allSeries
  res.push(arr.map(ele => parseInt(ele)))

  let a = 0
  while (true) {
    allSeries = []
    i = 0
    j = i + 1
    
    if (res[res.length - 1].every(ele => ele === 0) ||res[res.length - 1].length<1 ) {break}

    while (i < j && j < res[a].length) {
      if(res[a].length>1){
        allSeries.push(res[a][j]-res[a][i])
        i = j
        j = i + 1
      }else{
        break
      }
    }
    // console.log(res)
      res.push(allSeries)

      a += 1
  }
  for (let i = res.length - 1; i > 0; i--) {
    let toadd = res[i-1][0]-res[i][0]
    res[i-1].splice(0,0 , toadd)
    res[i - 1].push(res[i][res[i].length - 1] + res[i - 1][res[i - 1].length - 1])
  }
  return parseInt(res[0][0])

}
