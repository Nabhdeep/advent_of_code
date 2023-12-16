import readFile from '../helper.js'

readFile('2023/day13/input.txt')
.then((data)=>{
    let newData = []
    let prev = -1
    for(let i = 0 ; i<data.length ; i++){
        if(data[i].length === 0){
            newData.push(data.slice(prev+1 , i))
            prev = i
        }
        if(i===data.length-1){
            newData.push(data.slice(prev+1,i+1))
        }
    }
// console.log(newData[0]) 
// console.log('=====================================')
// findTransponse(newData[0]).forEach((ele)=>{
//     console.log(ele)
// })
let res = 0
newData.forEach((ele)=>{
    res += findIncidence(ele)
})
console.log('Part 1 =>',res)
})
.catch((err)=>{
    console.log('Error readFile' , err)
})

//p=> pattern
function findIncidence(p){
    //findVertical
    let res = 0
    let dataVertical = findTransponse(p)
    let vertical = calculate(dataVertical) 
    res += vertical
    //findHorizontal
    let hori = calculate(p)
    res += 100*hori

    return res
}




function calculate(data){
    console.log(data.length)
    for(let i = 1 ; i<data.length ; i++){
        let above = data.slice(0,i).reverse()
        let below = data.slice(i)
        above = above.slice(0,below.length)
        below = below.slice(0,above.length)
        // if(JSON.stringify(above)===JSON.stringify(below)){
        //     return i
        // }
        let acc = []
        above.forEach((eleAbove , idx)=>{
            let eleBelow = below[idx].split('')
            let temp = []
            eleAbove.split('').forEach((charAbove , charIdx)=>{
                if(charAbove === eleBelow[charIdx]){
                    temp.push(0)
                }else{
                    temp.push(1)
                }
            })
            acc.push(temp.reduce((accumulator , curr)=> accumulator+curr))
        })

        if(acc.reduce((accumulator , curr)=>accumulator +curr) ===1){
            return i
        }
    }
    return 0
}


// function calculate(data){
//     console.log(data)
//     let i=0 
//     let j  = i+1
//     while(j<data.length){
//         console.log(data[i] , data[j] ,i, j)
//         if(data[i]===data[j]){
//             console.log(data[i] , data[j] , i,j )
//             let up = i
//             let down = j
//             let flag = false
//             while(up>=0 && down<data.length){
//                 if(data[up]!==data[down]){
//                     flag = true
//                    break
//                 }else{
//                     up--
//                     down++
//                 }
//             }
//             if((up<=0 || down===data.length)&& !flag){
//                 return i+1
//             }
//         }
        
//         i = j
//         j++
//     }
//     return 0
// }

function findTransponse(data){
    let tData = []

    for(let c = 0 ; c<data[0].length ; c++){
        let curr = ''
        for(let r = 0 ; r<data.length ; r++){
            curr += data[r][c]
        }
        tData.push(curr)
    }
    return tData
}