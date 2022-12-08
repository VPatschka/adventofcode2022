const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

function onEdge(x, y) {
    return x === 0 || y === 0 || x === treeMatrix[0].length - 1 || y === treeMatrix.length - 1
}

const input = fs.readFileSync(filePath).toString()

const treeMatrix = input.split('\n').map(line => line.split('').map(height => parseInt(height)))

const directions = [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 0, y: -1},
]
let visible = (treeMatrix.length - 1) * 4
let maxScenicScore = 0
for (let y = 1; y < treeMatrix.length - 1; y++) {
    for (let x = 1; x < treeMatrix[0].length - 1; x++) {
        const currentHeight = treeMatrix[y][x]
        let currentVisible = false
        let scenicScore = 1
        for (const direction of directions) {
            let dx = 0
            let dy = 0
            let visibileThroughThisDirection = true
            do {
                dx += direction.x
                dy += direction.y
                if (currentHeight <= treeMatrix[y + dy][x + dx]) {
                    visibileThroughThisDirection = false
                    break
                }
            } while(!onEdge(x + dx, y + dy))

            if (visibileThroughThisDirection) {
                currentVisible = true
            }
            scenicScore *= Math.abs(dx + dy)
        }

        if (currentVisible) {
            visible++
        }

        if (scenicScore > maxScenicScore) {
            maxScenicScore = scenicScore
        }
    }
}

console.log(`First: ${visible}`)
console.log(`Second: ${maxScenicScore}`)