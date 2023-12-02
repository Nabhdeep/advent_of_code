import readFile from "../helper.js";
const dictionary = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};



readFile('2023/day1/input.text')
    .then((data) => {
        let sumOfCalibratedValues = 0
        console.log('GOt data:', data)
        for (let i = 0; i < data.length; i++) {
            let a = findDigitandChar(data[i])
            console.log(data[i], a)
            sumOfCalibratedValues += parseInt(a)
            console.log(sumOfCalibratedValues)
        }
        return sumOfCalibratedValues
    }).catch((err) => {
        console.error(err)
    })


function findDigitandChar(line) {
    let l = 0;
    let r = line.length - 1;
    let first, last;
    let combineFirst = ''
    let combineLast = ''
    while (l <= r) {

        if (!first) {
            combineFirst += line[l]
            let foundSubString = Object.keys(dictionary).find(subStr => combineFirst.includes(subStr))
            if (foundSubString) {
                first = dictionary[foundSubString]
            } else if (line[l].match(/[0-9]/g)) {
                first = line[l]
            }
            else {
                l++
            }
        }
        if (!last) {
            combineLast = line[r] + combineLast
            let foundSubString = Object.keys(dictionary).find(subStr => combineLast.includes(subStr))
            if (foundSubString) {
                last = dictionary[foundSubString]
            } else if (line[r].match(/[0-9]/g)) {
                last = line[r]
            } else {
                r--
            }
        }
        if (first && last) {
            break
        }
    }
    if (!first && !last) return 0
    if (!first) return last
    if (!last) return first
    return first.toString() + last.toString()
}




function findDigit(line) {
    let p = 0
    let first, last;
    while (p < line.length) {
        if (Number(line[p])) {
            if (!first) {
                first = line[p]
                last = line[p]
            } else {
                last = line[p]
            }
        }
        p++
    }
    return first + last

}
