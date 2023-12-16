import readFile from '../helper.js'

readFile('2023/day12/input.text')
.then((data)=>{
    data = data.map((ele)=>ele.split(' '))
    let res = 0
    let part2 = 0
    data.forEach(element => {
        let [con , num] = element
        num = num.split(',').map(ele=> parseInt(ele))
        res +=findCombinations(con , num)
        let times = 5
        let [part2Con , par2Num] = element
        let repeatedString = ""
        while (times > 0) {
            repeatedString += "?"+part2Con;
            times--;

        }
        const duplicateArr = (arr, times) =>
        Array(times)
        .fill([...arr])
        .reduce((a, b) => a.concat(b));
        const num2 = duplicateArr(num , 5)
        const conf = repeatedString.slice(1,)
        // console.log(num)
        part2 += findCombinations(conf , num2)
    });
    console.log(res)
    console.log(part2)
})
.catch((err)=>{
    console.log('Error in ReadFile', err)
})

let memo =  new Map()
function findCombinations(conf , nums){
 if (conf.length===0){
    return nums.length===0?1:0
 }
 if(nums.length===0){
    return conf.includes('#')?0:1
 }

 let key = JSON.stringify(conf)+JSON.stringify(nums)
 if(memo.has(key)){
    return memo.get(key)
 }
 let result = 0
 if ('.?'.includes(conf[0])){
    result += findCombinations(conf.slice(1,) , nums)
 }
 if('?#'.includes(conf[0])){
    if(nums[0]<=conf.length && !conf.slice(0,nums[0]).includes('.') && conf[nums[0]]!='#'){
        result+= findCombinations(conf.slice(nums[0]+1,) , nums.slice(1,))
    }
 }
 memo.set(key , result)
 return result
}