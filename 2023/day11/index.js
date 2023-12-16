import readFile from "../helper.js";


readFile('2023/day11/input.text')
  .then((data) => {
    data = data.filter(ele => ele && ele)
    data= data.map(element => {
      return element.split('')
    });
    let coord = coordiate(data)
    let rows = findEmptyRows(data)
    let cols = findEmptyCols(data)
    let d=0
    for(let i=0 ; i<coord.length-1 ; i++){
      for(let j=i+1 ; j<coord.length ; j++){
        d+=dist(coord[i],coord[j] , rows , cols)
      }
    }
    console.log('Part1->>',d)
  })
  .catch((err) => {
    console.log('Error in readFile', err)
  })

  function findEmptyRows (data){
    let res = []
    for(let r = 0 ;r<data.length ; r++){
      for(let c=0 ; c<data[0].length ; c++){
        if(data[r].every((ele)=> ele==='.')){
          res.push(true)
          break
        }
        res.push(false)
        break
      }
    }
    return res
}

function findEmptyCols (data){
  let res =[]
  for(let c=0 ; c<data[0].length ; c++){
    let temp = []
    for(let r = 0 ; r<data.length ; r++ ){
      temp.push(data[r][c])
    }
    temp.every((ele)=> ele === '.')?
    res.push(true):res.push(false)    
  }
  return res
}

function coordiate(data){
  let res = []
  for(let i = 0 ; i<data.length ; i++){
    for(let j = 0 ; j<data[0].length ; j++){
      if(data[i][j]==='#'){
        res.push([i,j])
      }
    }
  }
  return res
}


function dist(g1 , g2 , rows  , cols){
  let [x1,y1] = g1
  let [x2,y2] = g2
  let extra = 0
  for(let i= Math.min(x1 , x2) ; i<Math.max(x1 , x2) ; i++){
    if(rows[i]){
      extra +=10**6-1
    }
  }
  for(let i= Math.min(y1 , y2) ; i<Math.max(y1 , y2) ; i++){
    if(cols[i]){
      extra +=10**6-1
    }
  }
  return (Math.abs(Math.max(x1 , x2) - Math.min(x1 , x2)) + Math.abs(Math.max(y1 , y2) - Math.min(y1 , y2)))+extra
}


