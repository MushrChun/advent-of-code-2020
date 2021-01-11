const fs = require('fs')

const txt = fs.readFileSync('./input0.txt', 'utf8')

const cache = new Map()

function extractMap() {
    const regex = /(?:(?<bag>.+) bags contain)* (?<number>[\d]+) (?<innerBag>[\w\s]+) bags?[,.]/g

    let cur = regex.exec(txt)

    let memBag

    while (cur !== null) {
        const { groups: { bag, innerBag } } = cur

        memBag = bag || memBag

        const arr = cache.get(memBag)
        if (arr) {
            arr.push(innerBag)
        } else {
            cache.set(memBag, [innerBag])
        }

        cur = regex.exec(txt)
    }
}

extractMap()
// console.log(cache)

const visited = new Map()

const keyword = 'shiny gold'

let count = 0

function deepCheck(key, arr) {
    const checked = visited.get(key)
    if (checked) {
        return checked
    }

    if (!arr) {
        visited.set(key, false)
        return false
    }

    if (arr.includes(keyword)) {
        visited.set(key, true)
        return true
    }

    for (let innerBag of arr) {
        if (deepCheck(innerBag, cache.get(innerBag))) return true
    }

    visited.set(key, false)
    return false
}

for (let [key, arr] of cache) {
    console.log(key, arr)

    if (deepCheck(key, arr)) count++
}

console.log(count)