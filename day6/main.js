const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

// const arr = txt.split(`${os.EOL}${os.EOL}`).map(line => line.replace(new RegExp(`${os.EOL}`, 'g'), ''))
const arr = txt.split(`${os.EOL}${os.EOL}`)

// const ans = arr.reduce((acc, cur) => {
//     const pool = new Set()
//     for(const char of cur){
//         pool.add(char)
//     }
//     console.log(cur,pool.size)
//     return acc + pool.size
// }, 0)

function countSame(block) {
    const lines = block.split(os.EOL)

    if (lines.length === 1) return lines[0].length

    let count = 0

    for (char of lines[0]) {
        let all = true
        for (let i = 1; i < lines.length; i++) {
            all = all && lines[i].includes(char)
        }
        if (all) count++
    }

    return count
}

const ans = arr.reduce((acc, cur) => {
    
    const count = countSame(cur)

    // console.log('=>',cur, count)

    return acc + count
}, 0)

console.log(ans)