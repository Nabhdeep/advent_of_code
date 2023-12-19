import readFile from '../helper.js'

let seen = { }

readFile('2023/day14/demo.txt')
.then((data)=>{
    //print input
    //! PART-1
    data = data.map(element => element.split(''));
    let res = tilt(data)
    console.log(calculateScore(res))
    let temp = res.map(ele=>ele.join(''))
    temp.forEach(element => {
        console.log(element)  
    })

    //!PART-2
    // let cycleMap = new Set()
    // cycleMap.add(JSON.stringify(data))
    // let arr = [data]

    // for(let i = 0 ; i<10**9 ; i++){
    //     data = doCycle(data)
    //     if(cycleMap.has(JSON.stringify(data))) break
    //     cycleMap.add(JSON.stringify(data))
    //     arr.push(JSON.stringify(data))
    // }
    // let cycleStartsAt = cycleMap.size
    // let firstCycle = arr.indexOf(JSON.stringify(data))
    // let ans = arr[((1000000000 - firstCycle)% (cycleStartsAt - firstCycle))+firstCycle]
    // console.log(calculateScore(JSON.parse(ans)))
    
})
.catch((err)=>{
    console.log('Error in readFile' , err)
})

// function tilt(grid){
//     let r = 0
//     let c = 0
//     let j = r+1
//     let squareRock = []
//     while(r<grid.length-1){
//         j=r+1
//         while(j<grid.length){
//             c=0
//             while(c<grid[0].length){
//                 if(grid[j][c]==='#' && !squareRock.some(item => item[0] === j && item[1] === c)){
//                     squareRock.push([j,c])
//                 }
//                 if(grid[j][c]==='O' && grid[r][c]==='.' && !squareRock.some(item => item[0]<= j && item[0]>=r && item[1] === c)){
//                     grid[r][c] = 'O'
//                     grid[j][c] = '.'
//                 }

//                 c++
//             }
//             j++
//         }
//         r +=1
//     }
//     return grid
// }

function tilt(grid){
    for(let r = 0 ; r<grid.length ; r++){
        for(let c=0 ; c<grid[0].length ; c++){
            if(grid[r][c]=== 'O'){
                for(let i= r-1 ; i>=0 ; i--){
                    if(grid[i][c]==='#' || grid[i][c]==='O'){
                        grid[r][c]='.';
                        grid[i+1][c]='O'
                        break;
                    }

                    if(i===0){
                        grid[r][c]='.';
                        grid[0][c]='O'
                        break
                    }
                }
            }
        }
    }
    return grid
}

function calculateScore (res)
{
    let part1 = 0
    for(let i=0 ; i<res.length ; i++){
    let count = 0
    for(let j=0 ; j<res[0].length ; j++){
        if(res[i][j]==='O'){
            count++
        }
    }
    part1 += count*(res.length-i)
}
return part1
}




function findTransponseRight(data , i){
        let temp = []
        for(let c =0  ; c<data.length; c++){
            let curr = ''
            for(let r = 0 ; r<data.length ; r++){
                curr += data[r][c]
            }
            curr=  curr.split('').reverse().join('')
            temp.push(curr)
        }
        data = temp    
    return data
}






function doCycle(data){
    let localData = structuredClone(data)
    for(let i=0 ; i<4 ; i++){
        
        localData = localData.map(element => element.split(''));
        localData = tilt(localData)
        localData = localData.map(ele=>ele.join(''))
        localData = findTransponseRight(localData)
    }
    return localData
}