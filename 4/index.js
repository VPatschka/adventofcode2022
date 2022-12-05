const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const createRange = (definition) => {
    const [from, to] = definition.split('-')
    return {from: parseInt(from), to: parseInt(to)}
}

const isInside = (outer, inner) => {
    return outer.from <= inner.from && outer.to >= inner.to
}

const input = fs.readFileSync(filePath).toString()
const pairs = input.split('\n')

let containCounter = 0, overlapCounter = 0
for (const pair of pairs) {
    const ranges = pair.split(',')
    const firstRange = createRange(ranges[0])
    const secondRange = createRange(ranges[1])

    if (isInside(firstRange, secondRange) || isInside(secondRange, firstRange)) {
        containCounter++
    }

    //StartA <= EndB) and (EndA >= StartB
    if (firstRange.from <= secondRange.to && firstRange.to >= secondRange.from) {
        overlapCounter++
    }
}

console.log(`First: ${containCounter}`)
console.log(`Second: ${overlapCounter}`)