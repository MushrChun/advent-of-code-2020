const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const str = txt.split(`${os.EOL}`)[1]

const arr = str.split(',').map(num => parseInt(num))

const list = [] // [[interval, offset] ...]

// set offset matrix
for ([index, num] of arr.entries()) {
    if (!isNaN(num)) {
        list.push([num, index])
    }
}

console.log(list)

let time = list[0][0]
let increase = list[0][0]

for (let i = 1; i < list.length; i++) {
    const [interval, offset] = list[i]
    while (true) {
        const r = (time + offset) % interval
        if (r !== 0) {
            time += increase
        } else {
            break
        }
    }

    increase *= interval
}

console.log(time)
