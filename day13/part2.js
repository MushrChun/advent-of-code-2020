const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const str = txt.split(`${os.EOL}`)[1]

const arr = str.split(',').map(num => parseInt(num))
console.log(arr)

const maxNum = Math.max(...arr.filter(num => !isNaN(num)))
console.log(maxNum)

let maxOffset

const list = [] // [[num, offset] ...]

// set offset matrix and find out maxOffset
for ([index, num] of arr.entries()) {
    if (!isNaN(num)) {
        list.push([num, index])
    }
    if (num === maxNum) {
        maxOffset = index
    }
}

console.log(list)
console.log(maxOffset)



for (let i = 0; i < list.length; i++) {
    let [num, offset] = list[i]
    const newOffset = offset - maxOffset
    list[i] = [num, newOffset]
}


console.log(list)


function check(time) {
    for ([num, offset] of list) {
        const r = (time + offset) % num
        if (r !== 0) return false
    }
    return true
}


let time = 0
while (true) {
    if (check(time)) break
    time += maxNum
}


console.log(time - maxOffset)
