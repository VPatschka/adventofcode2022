const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString()
const pathes = input.split('\n')
    .map(line => line.split(' -> '))
    .map(coordinates =>
        coordinates.map(coordinate => {
            const [x, y] = coordinate.split(',').map(coordinate => parseInt(coordinate))
            return {x, y}
        })
    )

const allCoordinates = pathes.flatMap(path => path)
const minX = Math.min(...allCoordinates.map(({x}) => x))
const maxX = Math.max(...allCoordinates.map(({x}) => x))
const minY = Math.min(...[0, ...allCoordinates.map(({y}) => y)])
const maxY = Math.max(...allCoordinates.map(({y}) => y))
const sandStart = {x: 500, y: 0}
console.log({minX, maxX, minY, maxY})

function contains(arr, item) {
    return arr.filter(block => block.x === item.x && block.y === item.y).length > 0
}

const allPathes = []
for (const path of pathes) {
    // allPathes.push(path[0])
    for (let i = 0; i <= path.length - 2; i++) {
        // allPathes.push(path[i + 1])

        const diffX = path[i].x - path[i + 1].x
        const diffY = path[i].y - path[i + 1].y
        if (diffX) {
            const minPathX = diffX < 0 ? path[i].x : path[i + 1].x
            for (let j = 0; j <= Math.abs(diffX); j++) {
                allPathes.push({ x: minPathX + j, y: path[i].y })
            }
        }
        if (diffY) {
            const minPathY = diffY < 0 ? path[i].y : path[i + 1].y
            for (let j = 0; j <= Math.abs(diffY); j++) {
                allPathes.push({ x: path[i].x, y: minPathY + j })
            }
        }
    }
}

const sands = []
const directions = [{ x: 0, y: 1}, {x: -1, y: 1}, {x: 1, y: 1}]
let isLastSand = false
do {
    let sandPosition = {...sandStart}
    let directionIndex = 0
    do {
        let direction = directions[directionIndex]

        const newSandPosition = { x: sandPosition.x + direction.x, y: sandPosition.y + direction.y }
        if (!contains(sands, newSandPosition) && !contains(allPathes, newSandPosition)) {
            sandPosition = newSandPosition
            directionIndex = 0
        } else {
            directionIndex++
        }

        if (sandPosition.y >= maxY) {
            isLastSand = true
            break
        }
    } while (directionIndex < directions.length)

    sands.push(sandPosition)
} while (!isLastSand)

console.log(`First: ${sands.length - 1}`)