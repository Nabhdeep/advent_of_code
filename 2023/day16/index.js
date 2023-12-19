import readFile from '../helper.js';

// const R = [0, 1]
// const L = [0,-1]
// const U = [-1,0]
// const D = [1, 0]
let inputGlobal;
readFile('2023/day16/input.txt')
.then((input)=>{
    inputGlobal = input.map(ele=>ele.split(''))

    let max = 0
    for(let i=0 ; i<inputGlobal.length; i++){
        let curr = checkMax(i,-1 , 0,1)-1
        let currRight = checkMax(i,inputGlobal[0].length , 0 , -1)
       max = Math.max(curr,currRight,max)
    }

    for(let j=0 ; j<inputGlobal[0].length; j++){
        let curr = checkMax(-1,j, 1,0)
        let currUp = checkMax(inputGlobal.length , j , -1,0)
        max = Math.max(curr,currUp,max)
    }
    console.log(max-1)
})
.catch((err)=>console.log('Error in ReadFile: ', err))


// function processBfs(row,col,d){
//     let q = []
//     let seen = new Set()
//     q.push([row,col,d])
//     seen.add([row ,col , d])
//     while(q.length>0){
//         // console.log(q)
//         let [r ,c,dir] = q.shift() 
        // if (r<0 || r>=inputGlobal.length || c<0 || c>=inputGlobal[0].length){
        //     continue
        // }
//         if(!seen.has([r , c , dir])){
//             seen.add([r , c , dir])
//         }

//         if (inputGlobal[r][c] === '|' && (dir === R || dir === L)){
//             // seen.add([r , c , dir])
//             q.push([r+U[0] , c+U[1] , U])
//             q.push([r+D[0] , c+D[1] , D])
//         }else if(inputGlobal[r][c]=== '\\'){
//             //seen.add([r , c , dir])
//             if(dir===R){
//                 q.push([r+D[0] , c+D[1] , D])
//             }else if(dir===L){
//                 q.push([r+U[0] , c+U[1] , U])
//             }else if(dir===U){
//                 q.push([r+R[0] , c+R[1] , R])
//             }else if(dir===D){
//                 q.push([r+L[0] , c+L[1] , L])
//             }
//         }else if(inputGlobal[r][c]=== '/'){
//             //seen.add([r , c , dir])
//             if(dir===R){
//                 q.push([r+U[0] , c+U[1] , U])
//             }else if(dir===L){
//                 q.push([r+D[0] , c+D[1] , D])
//             }else if(dir===U){
//                 q.push([r+L[0] , c+L[1] , L])
//             }else if(dir===D){
//                 q.push([r+R[0] , c+R[1] , R])
//             }
//         }else if(inputGlobal[r][c]=== '-'  && (dir === U || dir === D) ){
//             //seen.add([r , c , dir])
//             q.push([r+R[0] , c+R[1] , R])
//             q.push([r+L[0] , c+L[1] , L])
//         }
//         else{
//             q.push([r+dir[0] , c+dir[1] , dir])
//         }
//     }

//     console.log(seen)
// }


function processBfs (row,col,dRow,dCol){
let seen = new Set()
let q = []
q.push([row,col,dRow,dCol])
seen.add(JSON.stringify([row,col,dRow,dCol]))
while(q.length>0){
    let [r ,c, dr ,dc] = q.shift()
    r +=dr
    c +=dc
    if (r<0 || r>=inputGlobal.length || c<0 || c>=inputGlobal[0].length){
        continue
    }
    /**
     * r-> 0,1   || up = -1,0
     * u-> -1,0 || r = 0,1
     * ====================
     * d-> 1,0 || l = 0,-1
     * l-> 0,-1 || d = 1,0
     */
    let nextDir = []
    // console.log(inputGlobal[r][c] , r, c , dr , dc)
    switch(inputGlobal[r][c]){
        case "/":
             /**
             * r-> 0,1   / up = -1,0
             * u-> -1,0 / r = 0,1
             * ====================
             * d-> 1,0  / l = 0,-1
             * l-> 0,-1 / d = 1,0
             */
            nextDir.push([-dc , -dr])
            break;
        case '\\':
            /**
             * r-> 0,1 \ d = 1,0
             * d-> 1,0 \ r = 0,1
             * u-> -1 ,0 \ l=0 ,-1 
             * l-> 0,-1 \ up = -1 ,0
             */
             nextDir.push([dc , dr])
             break;
        case '|':
            /**
             * r->0,1 | [-1,0][1,0]
             * l->0,-1 | [-1,0][1,0]
             */
            if(dc===0){
                nextDir.push([dr ,dc])
            }else{
                nextDir.push([1,0])
                nextDir.push([-1,0])
            }
            break;
        case '-':
            if(dr===0){
                nextDir.push([dr ,dc])
            }else{
                nextDir.push([0,1])
                nextDir.push([0,-1])
            }
            break;
        case '.':
            nextDir.push([dr ,dc])
            break;

    }

    for (let dir of nextDir){
        let [dr , dc] = dir
        
        if(!seen.has(JSON.stringify([r , c, dr ,dc]))){
            seen.add(JSON.stringify([r,c,dr,dc]))
            q.push([r,c,dr,dc])
        }
    }

}
return seen
}

function checkMax (r, c,dr ,dc){
    let seen = processBfs(r,c,dr,dc)
    let visited = []
    seen.forEach((ele , idx)=>{
        let [r , c , dr , dc] =JSON.parse(ele)
        let a = ([r,c]).toString()
        if(!visited.includes(a)){
            visited.push(a)
        }
    })
    return visited.length
}