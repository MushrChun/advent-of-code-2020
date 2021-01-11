const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const arr = txt.split(`${os.EOL}${os.EOL}`)

// console.log(arr)

function isValid(line) {
    // console.log(line)
    // console.log()
    const reg = /(\w{3}:\S+)+/g
    const ans = line.match(reg)

    // if(ans.length === 8) return true
    // else if(ans.length === 7 && !ans.find(pair => pair.includes('cid'))) return true
    // else return false

    if (ans.length < 7) return false
    if (ans.length === 7 && ans.find(pair => pair.includes('cid'))) return false

    for (const pair of ans) {
        const [key, value] = pair.split(':')
        console.log(key, value)
        if (key === 'byr') {
            const digit = parseInt(value)
            if (digit < 1920 || digit > 2002) return false
        } else if (key === 'iyr') {
            const digit = parseInt(value)
            if (digit < 2010 || digit > 2020) return false
        } else if (key === 'eyr') {
            const digit = parseInt(value)
            if (digit < 2020 || digit > 2030) return false
        } else if (key === 'hgt') {
            if (value.slice(-2) === 'cm') {
                const digit = parseInt(value.slice(0, -2))
                if (digit < 150 || digit > 193) return false
            } else if (value.slice(-2) === 'in') {
                const digit = parseInt(value.slice(0, -2))
                if (digit < 59 || digit > 76) return false
            } else return false
        } else if (key === 'hcl') {
            if (!/^#[0-9a-f]{6}$/g.test(value)) return false
        } else if (key === 'ecl') {
            if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/g.test(value)) return false
        } else if (key === 'pid') {
            if (value.length !== 9) return false
        }
    }

    return true

}

let count = 0

for (line of arr) {
    const l = line.replace(new RegExp(`${os.EOL}`, 'g'), ' ')
    const ans = isValid(l)

    console.log(l, ans)
    if (ans) {
        count++
    }
}

console.log('total:', arr.length)
console.log('count:', count)