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

let acc

function checkValid(arr) {
    const visited = []
    let p = 0
    acc = 0

    while (!visited.includes(p) && p < arr.length) {
        visited.push(p)

        // console.log(arr[p], p)

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

    if (p === arr.length) {
        return true
    } else {
        return false
    }
}

for (let i = 0; i < arr.length; i++) {

    console.log(i)

    const { op } = arr[i]
    let ans = false
    if (op === 'nop') {
        arr[i].op = 'jmp'
        ans = checkValid(arr)
        arr[i].op = op
    } else if (op === 'jmp') {
        arr[i].op = 'nop'
        checkValid(arr)
        ans = checkValid(arr)
        arr[i].op = op
    }

    if (ans) break
}

console.log('acc', acc)