const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(os.EOL)

// console.log(arr)

const mod = arr[0].length
const depth = arr.length


function hasTree(pos) {
    const { row, col } = pos
    // console.log(row, col)
    const char = arr[row][col % mod]
    if (char === '#') return true
    else return false
}

function calculate(right, down) {
    const pos = {
        row: 0,
        col: 0
    }

    let count = 0

    while (true) {
        pos.row += down
        pos.col += right
        if (hasTree(pos)) {
            count++
        }
        if (pos.row >= depth - 1) {
            break
        }
    }

    return count
}



console.log(calculate(1, 1))
console.log(calculate(3, 1))
console.log(calculate(5, 1))
console.log(calculate(7, 1))
console.log(calculate(1, 2))