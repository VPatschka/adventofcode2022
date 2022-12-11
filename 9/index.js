const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString()
let visited = [{ x: 0, y: 0 }]
let knots = new Array(10).fill({x: 0, y: 0});

const instructions = input.split('\n')
const directions = {
    R: {x: 1, y: 0},
    U: {x: 0, y: 1},
    L: {x: -1, y: 0},
    D: {x: 0, y: -1},
}

const moveHead = (direction) => {
    const head = knots[0]
    knots[0] = {
        x: head.x + direction.x,
        y: head.y + direction.y
    }
}

const moveTail = (head, tail) => {
    if (Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2) {
        return tail
    }

    return ({
        x: tail.x + Math.sign(head.x - tail.x),
        y: tail.y + Math.sign(head.y - tail.y)
    })
}

const updateVisited = (tail) => {
    if (!visited.some(({ x, y }) => x === tail.x && y === tail.y)) {
        visited.push(tail)
    }
}

for (const instruction of instructions) {
    const [directionKey, stepsStr] = instruction.split(' ')
    const steps = parseInt(stepsStr)

    const direction = directions[directionKey]
    for (let i = 0; i < steps; i++) {
        moveHead(direction)
        for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
            knots[knotIndex] = moveTail(knots[knotIndex - 1], knots[knotIndex])
            if (knotIndex === knots.length - 1) {
                updateVisited(knots[knotIndex])
            }
        }
    }
}

console.log(`Result: ${visited.length}`)