const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(`${os.EOL}`).map(num => parseInt(num))

arr.sort((a, b) => a - b)

const tail = arr[arr.length - 1]

arr.push(tail + 3)

arr.unshift(0)

console.log(arr)

const cache = new Map()

function go(cur) {
    if (cache.has(cur)) return cache.get(cur)
    if (cur === arr.length - 1) {
        return 1
    }
    let count = 0
    let next = cur + 1
    while (arr[next] - arr[cur] <= 3) {
        count += go(next)
        next++
    }
    cache.set(cur, count)
    return count
}

console.log(go(0))

