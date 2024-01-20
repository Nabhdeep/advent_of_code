import readFile from '../helper.js';
let to_From = new Map()
let from_To = new Map()
readFile('2023/day22/input.txt')
  .then((input) => {
    input = input.filter(ele => ele && ele).map(ele => ele.replace('~',',').split(',').map(ele=>parseInt(ele)))
    // console.log(input)
    let bricks = sortBricksOnZ(input)
    bricks = dropBricks(bricks)
    mapBricks(bricks)
    console.log(to_From , from_To);
    let totol = 0
    let tempJ = []
    for (let i=0 ; i<bricks.length;i++){
      
      let s = from_To.get(i)
      for(let j of s){
        tempJ.push(to_From.get(j).size)
      }
      if(tempJ.every(ele=> ele >= 2)){
        totol +=1
      }
      tempJ = []
    }
    console.log(totol);
  })
  .catch((err) => console.log('Error in ReadFile: ', err))


  function sortBricksOnZ(bricks){
    bricks.sort((a,b)=>a[2]-b[2])
    return bricks
  }

function intersect(a , b){
  if(Math.max(a[0],b[0])<=Math.min(a[3],b[3]) && Math.max(a[1],b[1])<= Math.min(a[4],b[4])){
    return true
  }
  return false
}

  function dropBricks(brikcs) {
    let max_z = 1
    for(let b=0 ; b<brikcs.length ; b++){
      for (let b2=0 ; b2<brikcs.slice(0,b).length ; b2++){
        if(intersect(brikcs[b] , brikcs[b2])){
          max_z = Math.max(max_z,brikcs[b2][5]+1)
        }
      }
      brikcs[b][5] -= brikcs[b][2] - max_z
      brikcs[b][2] = max_z
    }

    return sortBricksOnZ(brikcs)
}

function mapBricks(brikcs){
  for (let i =0 ; i<brikcs.length ; i++) {
    from_To.set(i, new Set());
    to_From.set(i, new Set());
}
  for (let i=0 ; i<brikcs.length ; i++){
    for (let j=0 ; j<i; j++){
      if(intersect(brikcs[j] , brikcs[i]) && brikcs[i][2]===(brikcs[j][5])+1){
          to_From.get(i).add(j)
          from_To.get(j).add(i)
      }
    }
  }
  return;
}
