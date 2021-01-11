const fs = require('fs')

const txt = fs.readFileSync('./input.txt', 'utf8')

const cache = new Map()

function extractMap() {
    const regex = /(?:(?<bag>.+) bags contain)* (?<number>[\d]+) (?<innerBag>[\w\s]+) bags?[,.]/g

    let cur = regex.exec(txt)

    let memBag

    while (cur !== null) {
        const { groups: { bag, number, innerBag } } = cur

        memBag = bag || memBag

        const arr = cache.get(memBag)
        if (arr) {
            arr.push({ number: parseInt(number), innerBag })
        } else {
            cache.set(memBag, [{ number: parseInt(number), innerBag }])
        }

        cur = regex.exec(txt)
    }
}

extractMap()
console.log(cache)

const visited = new Map()

const keyword = 'shiny gold'

let count

function countChildren(target) {
    const children = cache.get(target)

    if (children) {
        let count = 0
        for (const child of children) {
            count = count + child.number + child.number * countChildren(child.innerBag)
        }
        return count

    } else {
        return 0
    }
}

count = countChildren(keyword)

console.log(count)