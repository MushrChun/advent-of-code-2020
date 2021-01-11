const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(`${os.EOL}`)

const seatIdList = []

for (const line of arr) {
    let [front, back, left, right] = [0, 128, 0, 8]

    for (const char of line) {
        if (char === 'B') {
            front = Math.floor((front + back) / 2)
        }
        else if (char === 'F') {
            back = Math.floor((front + back) / 2)
        }
        else if (char === 'L') {
            right = Math.floor((left + right) / 2)
        }
        else if (char === 'R') {
            left = Math.floor((left + right) / 2)
        }
    }
    // console.log('row:', front, 'col:', left, 'seatId:', front * 8 + left)
    seatIdList.push(front * 8 + left)
}

// console.log(arr)
// console.log(Math.max(...seatIdList))


const sorted = seatIdList.sort((a,b) => a-b)
console.log(sorted)
let mem
for (item of sorted) {
    if (!mem) mem = item
    else {
        if (item - mem > 1) {
            console.log('gap:', mem, item)
        }
        mem = item
    }

}