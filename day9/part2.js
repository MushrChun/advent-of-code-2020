const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(`${os.EOL}`).map(num => parseInt(num))

const target = 466456641

function doSum(arr) {
    return arr.reduce((acc, cur) => acc + cur, 0)
}

function main() {
    for (let head = 0; head < arr.length - 2; head++) {
        for (let tail = head + 1; tail < arr.length - 1; tail++) {
            const sum = doSum(arr.slice(head, tail + 1))
            // console.log('sum', sum)
            if (sum > target) break
            else if (sum === target) {
                console.log('target:', arr[head], arr[tail])
                console.log('max:', Math.max(...arr.slice(head, tail + 1)))
                console.log('min:', Math.min(...arr.slice(head, tail + 1)))
                return
            }
        }
    }
}

main()

