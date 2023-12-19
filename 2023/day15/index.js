import readFile from '../helper.js'


readFile('2023/day15/input.txt')
.then((input)=>{
    input = input.map(element => element.split(','))[0]
    let res = 0
    input.forEach(element => {
        let a = hashAlgo(element)
        res +=a
    });
    console.log('Part1->' , res)
    input.forEach(element=>{
        processLenses(element)
    })
    //console.log(boxes)
    let part2=0
    for(let [key , arr] of boxes){
        let [lable , value] = arr
        if(value.length ===0) continue
        value.forEach((ele , idx)=>{
            part2 = part2 + (ele * (idx+1) *(key+1))    
        })
    }
    console.log(part2)
})
.catch(err=>console.log('Error in Readfile: ',err))



function hashAlgo(str){
    let curr = 0
    for(let char of str){
        curr = ((curr+char.charCodeAt())*17)%256
    }
    return curr
}


let boxes = new Map()
// lables= lables.splice(idx,1)
function addRemoveLense(box,isDash,lable,lense){
    // console.log(lable , lense)
    if(!boxes.has(box)){
        boxes.set(box , [[lable],[lense]])
    }
    if(!isDash){
        let [lables , lenses] = boxes.get(box)
        if(lables.includes(lable)){
            let idx = lables.indexOf(lable)
            lenses.splice(idx , 1 , lense)
        }else{
            lables.push(lable)
            lenses.push(lense)
        }
        boxes.set(box , [lables , lenses])
    }else{
        let [lables , lenses] = boxes.get(box)
        if(lables.includes(lable)){
            let idx = lables.indexOf(lable)
            lables.splice(idx , 1)
            lenses.splice(idx , 1)
            
        }
        boxes.set(box , [lables , lenses])
    }
}


function processLenses(curr){

    let currSplit = curr.includes('-')? curr.split('-'):curr.split('=')
    let box = hashAlgo(currSplit[0])
    if(currSplit[1]===''){
        addRemoveLense(box , true , currSplit[0])
    }else{
        addRemoveLense(box , false , currSplit[0] , currSplit[1])
    }
}


// function  calculate(score){
//     let res = 0
//     for(let [key , value] of boxes){
//         if(value.length ===0) continue
//         value.forEach((ele , idx)=>{
//             res = res + (ele * idx *ele)    
//         })
//     }

// }