const os = require('os')
const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const [timeStr, busStr] = txt.split(`${os.EOL}`)

const time = parseInt(timeStr)
const buses = busStr.split(',').filter(char => char !== 'x').map(char => parseInt(char))

console.log(time)
console.log(buses)

const remainders = buses.map(interval => {
    return interval - time % interval
})

const min = Math.min(...remainders)
const pos = remainders.indexOf(min)

console.log(remainders)
console.log(min, buses[pos])
console.log(min * buses[pos])
