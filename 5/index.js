const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');
const stackCount = 9

const input = fs.readFileSync(filePath).toString()
const [startingPosition, instructions] = input.split('\n\n')

const startingPositionLines = startingPosition.split('\n')
const stackDefinitions = startingPositionLines.slice(0, startingPositionLines.length - 1)
const stacks = new Array(stackCount).fill([]);
console.log(stacks)
for (const line of stackDefinitions) {
    for (let stackIndex = 0; stackIndex < stackCount; stackIndex++) {
        const charPosition = 1 + stackIndex * 4
        if (line[charPosition] !== ' ') {
            stacks[stackIndex] = [...stacks[stackIndex], line[charPosition]]
        }
    }
}
console.log(stacks)

const instructionLines = instructions.split('\n')
for (const line of instructionLines) {
    const matches = line.match(/move (\d+) from (\d+) to (\d+)/)
    const count = parseInt(matches[1])
    const from = parseInt(matches[2]) - 1
    const to = parseInt(matches[3]) - 1

    // With reverse - first solution, without reverse - second solution
    const removed = stacks[from].splice(0, count)//.reverse()
    stacks[to] = [...removed, ...stacks[to]]
}

let output = ''
for (let stackIndex = 0; stackIndex < stackCount; stackIndex++) {
    output += stacks[stackIndex][0]
}

console.log(`Result: ${output}`)