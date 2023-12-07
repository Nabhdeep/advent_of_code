import readFile from "../helper.js";


readFile('2023/day6/input.text')
.then((data)=>{
    let dataTime = data[0].split(':')[1].match(/\d+/g).map(Number)
    let dataDist = data[1].split(':')[1].match(/\d+/g).map(Number)
    let res = calculateWays(dataTime , dataDist)
    let res2 = partTwo(dataTime.join("") , dataDist.join(''))
    console.log(res , res2)

})
.catch((err)=>{
    console.log(`Error in readFile ${err}`)
})


const calculateWays = (timeData , distData)=>{
    let ways = 1
    timeData.forEach((ele , idx) => {
        let localWays = 0
        let hold = 1
        while(hold<ele){
            let remaining = ele - hold
            localWays += remaining*hold>distData[idx]? 1:0 
            hold++
        }
        ways*=localWays
    });
    return ways
}

const partTwo = (timeNum , distNum) =>{
    console.log(timeNum , distNum)
    //timenumX - X^2 > distNume
    // -X2 + timenumX - distNum > 0
    
    let a = -1
    let b = timeNum
    let c = -distNum
    return solve(a , b , c)
}

function solve(a, b, c) {
    let result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    console.log(result + "<>" + result2)
    return Math.round(result2-result)

}