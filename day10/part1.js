const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(`${os.EOL}`).map(num => parseInt(num))

arr.sort((a, b) => a - b)

console.log(arr)

const cache = new Map()

for (let i = 0; i < arr.length; i++) {

    const gap = i === 0 ? arr[i] - 0 : arr[i] - arr[i - 1]

    const value = cache.get(gap)
    if (value !== undefined) {
        cache.set(gap, value + 1)
    }
    else {
        cache.set(gap, 1)
    }
}

const valueOf3 = cache.get(3)
cache.set(3, valueOf3 + 1)

console.log(cache)

