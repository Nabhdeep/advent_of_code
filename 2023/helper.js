import fs, { lstat } from 'fs'


function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        console.log(`Error in file fetch`, err)
        reject(err)
      }
      resolve(data.split('\n'))
    })
  })
}


export default readFile
