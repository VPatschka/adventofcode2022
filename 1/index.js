const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const sum = (arr) => arr.reduce((i, c) => i + c, 0)

const input = fs.readFileSync(filePath).toString()
const elves = input.split('\n\n')
const caloriesPerElf = elves.map(elf => sum(elf.split('\n').map(line => parseInt(line))))

caloriesPerElf.sort((first, second) => second - first)
console.log(`First: ${caloriesPerElf[0]}`)
console.log(`Second: ${sum(caloriesPerElf.slice(0, 3))}`)


