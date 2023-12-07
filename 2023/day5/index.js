import readFile from "../helper.js" 

let resSeed = []
let res = Infinity
let map = {}
readFile('2023/day5/demo.text')
  .then((data)=>{
    let temp = data[0].split(':')[1].split(' ').filter((ele)=> ele && ele)
    // resSeed = temp                 //for part ONe
    //
    //for prt 2
    for(let i=0 ; i<temp.length-1 ; i++){
      if(i%2!=0) continue
      let a = (parseInt(temp[i]) + parseInt(temp[i+1])-1)
      resSeed.push([parseInt(temp[i]) , a])
    }
    console.log(resSeed)
    // for
    data= data.slice(2,data.length)
    // console.log(data)
    let prevNaN;
    for (let i=0 ; i<data.length ; i++){
      if(data[i].length===0) {continue}
      let temp = data[i].split(" ").filter((ele)=>ele && ele)

      if(isNaN(temp[0])){
        map[temp[0]] = []
        prevNaN = temp[0]
      }else{
        map[prevNaN].push(temp)
      }
    }
    // for(let i of resSeed){           //part 1 Solution
    //   let a = checkLocation(i)
    //   if(res>a) res = a
    // }
    //
    partTwo([0,0])
    // console.log(map)
    //
    for (let rS of resSeed){
    findRange(rS)
    }
    console.log('Part 1 Ans', res)
  }).catch((err)=>{
    console.log('Error in readFile: ', err)
  })


const checkLocation = (seedNumber)=>{
  let nextLocation = parseInt(seedNumber)
  let listMap = Object.keys(map)
  console.log('Seed Check: ', seedNumber)
  for(let lm of listMap){
    let k = map[lm]
    for (let a of k){
      if(parseInt(a[1])<= parseInt(nextLocation)
         &&((parseInt(a[1])+parseInt(a[2])-1)>=parseInt(nextLocation))){
        console.log(a)
        nextLocation = Math.abs(parseInt(a[1])-parseInt(nextLocation))+parseInt(a[0])
        console.log(`${lm} Location ${nextLocation}`)
        break
      }
    }
  }

  return nextLocation 
}


const partTwo = (range)=> {
  let nextLocationRange = range
  // console.log(map)
  let listMap = Object.keys(map)
  // console.log('Seed Check: ', seedNumber)
  for(let lm of listMap){
    let k = map[lm]
    for (let a=0 ; a<k.length ; a++){
      let temp = []
      let temp2 = []
      // console.log(k[a])
      temp.push(parseInt(k[a][1]))
      temp.push(temp[0]+parseInt(k[a][2])-1)
      temp2.push(parseInt(k[a][0]))
      temp2.push(temp2[0]+parseInt(k[a][2])-1)
      k[a].push(temp)
      k[a].push(temp2)
      k[a] = k[a].slice(3,k[a].length)
    }
    // console.log(map[lm])
  }
}

const findRange = (range) =>{
  let [currLo , currHi] = range

  let listMap = Object.keys(map)
  // console.log('Seed Check: ', seedNumber)
  for(let lm of listMap){
    let k = map[lm]
    for (let a=0 ; a<k.length ; a++){
      // console.log('CRANGE', k[a])
      let remaining = []
      for (let c_range of k[a]){
        let lo = c_range[0]
        let hi = c_range[1]
        console.log(`currLo : ${currLo}  lo:  ${lo} || currHi: ${currHi} hi: ${hi}`)
        if(hi<currLo || lo>currHi) {
          // console.log('[]----[]----[]')
          continue}
        currLo = Math.max(currLo , lo)
        currHi = Math.min(currHi , hi)
        remaining.push([Math.abs(currLo-lo) , Math.abs(hi-currHi)])
        // if(hi>currLo && lo<=currLo && hi<currHi) {
        //   // console.log('[---[---]------]')
        //   currHi = hi
        // }
        //
        // if(lo>=currLo && (hi<=currHi || hi>currHi)) {
        //   currLo = lo 
        //   currHi = hi
        //   // console.log('[-----[]-----]')
        // }
        //
        // if(lo>currLo && hi>=currHi) {
        //   // console.log('[----[----]----]')
        //   currLo = lo
        // }


      }
      console.log(remaining)
    }
  }
      console.log("RES" ,[currLo , currHi])
}
