const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const regex = /(?<op>nop|acc|jmp) (?<sign>[+-])(?<num>\d+)/g

let cur = regex.exec(txt)

const arr = []

while (cur !== null) {
    const { op, sign, num } = cur.groups

    arr.push({ op, sign, num })

    cur = regex.exec(txt)
}

console.log(arr)

const visited = []
let p = 0
let acc = 0

while (!visited.includes(p)) {
    visited.push(p)

    const { op, sign, num } = arr[p]

    if (op === 'acc') {
        acc += parseInt(`${sign}${num}`)
        p++
    } else if (op === 'nop') {
        p++
    } else if (op === 'jmp') {
        p += parseInt(`${sign}${num}`)
    } else {
        throw new Error('Wrong OP type')
    }

}

console.log('acc:', acc)
