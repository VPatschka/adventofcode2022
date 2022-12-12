const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString()
const monkeyInputs = input.split('\n\n')
const operationType = ['power2', 'add', 'multi']
const monkeys = []
const maxRounds = 20

class Monkey {
    constructor(lines) {
        this.name = lines[0].split(/[ :]/g)[1]
        this.items = lines[1].split(': ')[1].split(', ').map(item => parseInt(item))
        this.operation = this.determineOperation(lines[2])
        this.testNumber = parseInt(lines[3].split('by ')[1])
        this.trueResultMonkey = parseInt(lines[4][lines[4].length - 1])
        this.falseResultMonkey = parseInt(lines[5][lines[5].length - 1])
        this.inspections = 0
    }

    determineOperation(line) {
        const equation = line.split('=')[1]
        if (equation.match(/old/g).length === 2) {
            return {type: 'power2'}
        }
        const type = equation.includes('*') ? 'multi' : 'add'

        return { type, value: parseInt(equation.split(/[+*]/)[1].trim())}
    }

    takeTurn() {
        while (this.items.length > 0) {
            this.inspections++
            let currentItemWorry = this.items.shift()
            currentItemWorry = this.changeWorryByOperation(currentItemWorry)
            currentItemWorry = Math.floor(currentItemWorry / 3)

            const testResult = currentItemWorry % this.testNumber
            const targetMonkey = testResult === 0 ? this.trueResultMonkey : this.falseResultMonkey

            monkeys[targetMonkey].addItem(currentItemWorry)
        }
    }

    changeWorryByOperation(itemWorry) {
        switch (this.operation.type) {
            case 'power2':
                return itemWorry * itemWorry
            case 'multi':
                return itemWorry * this.operation.value
            case 'add':
                return itemWorry + this.operation.value
        }
    }

    addItem(itemWorry) {
        this.items.push(itemWorry)
    }
}

for (const monkeyInput of monkeyInputs) {
    monkeys.push(new Monkey(monkeyInput.split('\n')))
}

for (let round = 0; round < maxRounds; round++) {
    for (const currentMonkey of monkeys) {
        currentMonkey.takeTurn()
    }
}

const inspectionsByMonkey = monkeys.map(monkey => monkey.inspections)
inspectionsByMonkey.sort((first, second) => second - first)
console.log(`First: ${inspectionsByMonkey[0] * inspectionsByMonkey[1]}`)