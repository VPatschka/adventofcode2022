const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString()
const instructions = input.split('\n')
let xRegister = 1
let cycles = 0
let significantCycle = 20
let firstResult = 0
let screen = ''

const addAndCheckCycle = () => {
    const screenPosition = cycles % 40
    if (screenPosition === 0) {
        screen += '\n'
    }
    const shouldLight = screenPosition >= xRegister - 1 && screenPosition <= xRegister + 1
    screen += shouldLight ? '#' : '.'

    cycles++
    if (cycles === significantCycle) {
        firstResult += xRegister * cycles
        significantCycle += 40
    }
}

for (const instruction of instructions) {
    const [code, valueStr] = instruction.split(' ')
    switch (code) {
        case 'noop':
            addAndCheckCycle()
            break
        case 'addx':
            const value = parseInt(valueStr)
            addAndCheckCycle()
            addAndCheckCycle()
            xRegister += value
            break
    }
}

console.log(`First: ${firstResult}`)
console.log(`Second:`)
console.log(screen)