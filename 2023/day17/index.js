import readFile from '../helper.js';

readFile('2023/day17/input.txt')
.then((input)=>{
    input = input.map(ele=> ele.split(''))

   console.log(search(input))
})
.catch((err)=>console.log('Error in ReadFile: ', err))

//hl , r, c,dr, dc , n
let q = [[0,0,0,0,0,0]]
let seen = new Set()


function search (input){
   while (q.length>0){
      let [hl , r , c ,dr , dc , n] = q.shift()
      console.log(hl)
      if(r===input.length-1 && c===input[0].length -1 && n>=4){
         return hl
      }
   
      if(seen.has(JSON.stringify([r,c,dr,dc,n]))) continue
      seen.add(JSON.stringify([r,c,dr,dc,n]))

  

      //[part 1 change to 3 ]
      if(n<10 && (dr!== 0 || dc!==0)){
         const nr = r+dr
         const nc = c+dc
         if(  nr >= 0 && nr < input.length && nc >= 0 && nc < input[0].length){
            q.push([hl+parseInt(input[nr][nc]) ,nr ,nc ,dr , dc ,n+1 ])
            q.sort((a,b)=>a[0]-b[0])
         }      
      }
      if (n >= 4 || (dr === 0 && dc === 0)) {
         const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
         for(const [ndr , ndc] of directions){
            if ((ndr!== dr || ndc!==dc) && (ndr!== -dr ||ndc!== -dc)){
               const nr = r+ndr
               const nc = c+ndc
               if( nr >= 0 && nr < input.length && nc >= 0 && nc < input[0].length ){
                  q.push([hl+parseInt(input[nr][nc]),nr ,nc ,ndr , ndc ,1])
                  q.sort((a,b)=>a[0]-b[0])
               }   
            }
         }
      }
   }
}



