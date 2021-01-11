const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(os.EOL)

let valid = 0
let invalid = 0

for (line of arr) {
    const [head, content] = line.split(': ')
    const [range, char] = head.split(' ')
    const [min, max] = range.split('-')

    // const count = (content.match(new RegExp(char, 'g')) || []).length
    // if (count <= max && count >= min) {
    //     valid ++
    // } else {
    //     invalid ++
    // }

    // console.log(line)
    // console.log(char, min, max, content)
    // console.log(count)

    // console.log(content[min - 1], content[max - 1], char)
    const first = content[min - 1]
    const second = content[max - 1]

    if (first === char && second === char) {
        invalid++
    }
    else if (first === char || second === char) {
        valid++
    } else {
        invalid++
    }

}

console.log('valid:', valid, 'invalid:', invalid)