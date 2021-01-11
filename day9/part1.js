const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(`${os.EOL}`).map(num => parseInt(num))

console.log(arr)

const step = 25

function check(i) {
    const tmp = arr.slice(i - step, i)
    tmp.sort((a, b) => a - b)

    const target = arr[i]

    // console.log(tmp, target)

    let head = 0
    let tail = tmp.length - 1
    while (head < tail) {
        const sum = tmp[head] + tmp[tail]
        // console.log(tmp[head], tmp[tail], sum)
        if (sum > target) tail--
        else if(sum < target) head++
        else {
            return true
        }
    }
    return false
}


for (let i = step; i < arr.length; i++) {
    if (!check(i)) {
        console.log(arr[i])
        break
    }
}
