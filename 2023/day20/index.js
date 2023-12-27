import readFile from '../helper.js';
let broadcast = new Set()
let _modules = {}
readFile('2023/day20/input.txt')
  .then((input) => {
    input = input.filter(ele=>ele && ele).map(ele=>ele.split('->'))
    //init broadcast
    let b =input[0][1].split(',')
    b.forEach(element => {
      broadcast.add(element.slice(1,))
    });
    //init Modules
    for(let i = 1 ; i<input.length; i++){
      let [m , o] = input[i]
      o = o.split(',')
      // console.log(o)
      o = o.map(ele=>ele.slice(1,))
      _modules[m.slice(1,m.length-1)] = new Modules(m.slice(1,m.length-1) , m[0] , o)
    }
    // init memory of &
    //
    for(let name in _modules){
      for(let out of _modules[name].output){
        if(out in _modules && _modules[out].type === '&'){
          _modules[out].memory.push(`${name}:lo`)
        }
      }
    }

    let part1 = sendPulse(1000)
    console.log(part1)
    findCycles()
  })
  .catch((err) => console.log('Error in ReadFile: ', err))


class Modules{
  constructor(name, type , output , memory){
    this.name = name
    this.type = type
    this.output = output
    this.memory = memory


    if(this.type === '%'){
      this.memory = 'off'
    }else{
      this.memory = []
    }
  }

  getModule(){
    return (`${this.name} {type:${this.type} , output:${this.output} , memory:${this.memory} }`)
  }
}


const sendPulse = (numPulse)=>{
  let lo = 0
  let hi = 0
  //name , to , pulse
  let q = []
  for(let i = 1 ; i<=numPulse ; i++){
    lo+=1
    for(let b of broadcast){
      q.push(['broadcast' , b , 'lo'])
    }
    while (q.length>0) {
      let [origin , to , pulse] = q.shift()
      pulse === 'lo'? lo+=1 : hi +=1
      if(!_modules.hasOwnProperty(to)) {continue};
      let _module = _modules[to]
      if(_module.type === '%'){
        if(pulse === 'lo'){
        _module.memory === 'off'? _module.memory = 'on':_module.memory = 'off'
        let p = _module.memory === 'on'? 'hi':'lo'
        for (let o of _module.output){
          q.push([_module.name , o , p]);
        }
      }
      }else{
        let mem = _module.memory
        let memory = []
        for (let m of mem){
          let [ori , prevPulse]=m.split(':');
          let idx  = mem.indexOf(m);
          if(ori === origin){
          mem.splice(idx , 1 , `${ori}:${pulse}`);
            memory.push(pulse)
          }else{
            memory.push(prevPulse)
          }
        }
        let outgoing = memory.every((item) => item === 'hi') ? 'lo' : 'hi'
        for (let o of _module.output){
          q.push([_module.name , o , outgoing]);
        }
      }
    }
  }

  return (lo*hi)
}


const findCycles = (numPulse)=>{
  let cyclesNum = {}
  let feed 
  for(let [key , v ]of _modules.entries()){
    console.log(v)
    if(_module.output[0]=== 'rx'){
      feed = _module.name
    }
  }
  console.log(feed)
  // for (let _module of _modules){
  //
  // }
}
