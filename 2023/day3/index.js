import readFile from '../helper.js'

readFile('2023/day3/input.text')
  .then((data) => {
    readLines(data)
  }).catch((err) => {
    console.log(`Error in readFile ${err}`)
  })



const readLines = (data) => {
  const arr = data.map(ele => ele.split(''));
  // console.log(arr)
  let rows = data.length
  let cols = data[0].length
  let mapArray = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push([]); 
    }
    mapArray.push(row);
  }
  let res = 0
  for (let r = 0; r < arr.length; r++) {
    let c = 0;
    let numStart = 0
    if (arr[r].length == 0) continue
    let currNum = "";
    while (c < arr[r].length){
      numStart = c
      // console.log(arr[r][c])
      while(c < arr[r].length && !isNaN(arr[r][c])){
        currNum += arr[r][c]
        c+=1
        continue
      }
      // console.log('currNum' , currNum)
      if((isNaN(arr[r][c]) || arr[r][c]==='.') && currNum){
        //467....
        //...*...
        currNum = parseInt(currNum)
        // console.log('NUnstatr' ,numStart)
        if(checkNumberAdjecent(r , numStart-1  ,data , currNum , mapArray) || checkNumberAdjecent(r, c ,data ,currNum , mapArray)){
          res += currNum
          c+=1
          currNum = ''
          continue
        }
        for(let k = numStart-1 ; k<=c ; k++){
          if(checkNumberAdjecent(r+1, k ,data , currNum , mapArray) || checkNumberAdjecent(r-1, k , data ,currNum , mapArray)){
            res +=  currNum
            c+=1
            break
          }
        }
        currNum = ''
      }

      if(c<arr[r].length && (isNaN(arr[r][c]) || arr[r][c]==='.')){
        c+=1
        continue
      }
    } 
    }
    console.log(totalNum(mapArray))
    console.log('ANSWER',res)
  }


const checkNumberAdjecent = (r , c , data , currNum , mapArray) => {
  // console.log('CHECK FOR NUMER: ',currNum)
  let row = data.length-1
  let col = data[0].length-1
  if ((!(0 <= r && r < row && 0 <= c && c < col)) ){
    return false
  }
  if(data[r][c]==='*') mapArray[r][c].push(currNum);

  // console.log(r ,c , data[r][c] , row ,col)
  // console.log(data[r][c]!=='.' && isNaN(data[r][c]))
  return (data[r][c]!=='.' && isNaN(data[r][c])) 
}


const totalNum = (mapArray)=>{
  let res = 0
  for(let i = 0 ; i<mapArray.length ; i++){
    for(let j=0 ; j<mapArray[i].length ; j++){
      if(mapArray[i][j].length === 2){
        res += mapArray[i][j].reduce((acc , ele)=> acc*ele)
      }
    }
  }
  return res
}







// const checkCases = (data, symFrom) => {
//   //case r+1
//   let [r, c] = symFrom;
//   // if (Number(data[r + 1][c])) {
//   let a = checkAdjecent(data[r + 1], c)
//   console.log('RES', a)
//   // }
//
//   // if (Number(data[r - 1][c])) {
//   let b = checkAdjecent(data[r - 1], c)
//   console.log('RES', b)
//   // }
//   let d = checkAdjecent(data[r], c)
//   console.log(d)
//
//   return (parseInt(a) + parseInt(b) + parseInt(d))
// }
//
// const checkAdjecent = (arr, c) => {
//   let res;
//   let lRes;
//   let rRes;
//   console.log(arr, c)
//   // <<---22->>..
//   let l = c - 1
//   let r = c + 1
//
//   if (arr[c].match(/[0-9]/)) {
//     res = arr[c]
//   }
//   for (let i = r; i < arr.length; i++) {
//     console.log('R Loop', arr[i])
//     if (arr[i] && arr[i].match(/[0-9]/g)) {
//       rRes = rRes ? rRes + arr[i] : arr[i]
//     } else {
//       break
//     }
//   }
//   for (let i = l; l > 0; i--) {
//     console.log("L Loop", arr[i])
//     if (arr[i] && arr[i].match(/[0-9]/g)) { lRes = lRes ? arr[i] + lRes : arr[i] } else { break; }
//   }
//   console.log(lRes, rRes)
//   if (!lRes && !rRes) return 0
//
//   if (!lRes || !rRes) {
//     if (res) {
//       return lRes ? lRes + res : res + rRes
//     }
//     return lRes || rRes
//   }
//   if (res) {
//     return lRes + res + rRes
//   }
//   return parseInt(lRes) + parseInt(rRes)
// }
//



