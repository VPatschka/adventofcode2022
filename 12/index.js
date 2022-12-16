const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString()
const matrix = input.split('\n').map(line => line.split(''))

const getPosition = (cell) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === cell) {
                return { cell, x, y, pathLength: 0, path: '' }
            }
        }
    }
}

const getPositions = (cell) => {
    const output = []
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === cell) {
                output.push({ cell, x, y, pathLength: 0, path: '' })
            }
        }
    }

    return output
}

// const start = getPosition('S')
// const end = getPosition('E')
// const visited = []
// const queue = [start]

const isInArray = (newCell, arr) => arr.filter(visitedCell =>
    visitedCell.x === newCell.x &&
    visitedCell.y === newCell.y //&&
    // visitedCell.pathLength < newCell.pathLength
).length > 0

const getValidNeighbours = ({ cell, x, y, pathLength, path }, queue, visited) => {
    const directions = [{x: -1, y: 0, d:'<'}, {x: 1, y: 0, d:'>'}, {x: 0, y: -1, d:'v'}, {x: 0, y: 1, d:'^'}]
    const output = []
    for (const direction of directions) {
        const newX = x + direction.x
        const newY = y + direction.y
        if (newX < 0 || newY < 0 || newX >= matrix[0].length || newY >= matrix.length) {
            continue
        }
        const newCell = matrix[newY][newX]

        // if (newCell === 'E') {
        //     console.log(cell)
        // }

        const cellElevation = newCell === 'E' ? 'z' : newCell
        const heightDifference = cellElevation.charCodeAt(0) - cell.charCodeAt(0)
        // console.log({heightDifference, newCell, cell})
        if (cell === 'S' || heightDifference <= 1) {
            output.push({x: newX, y: newY, cell: newCell, pathLength: pathLength + 1, path: path + direction.d})
        }
    }

    const result = output.filter(newCell => {
        if (!isInArray(newCell, visited) && !isInArray(newCell, queue)) {
            return true
        }
            // console.log('in arr')
        return false
    })
    // console.log({visited, queue, output, result})
    return result
}

const getPathLength = (start) => {
    const queue = [start]
    const visited = []
    while (queue.length > 0) {
        const currentCell = queue.shift()

        if (currentCell.cell === 'E') {
            console.log(`result for [${start.x}, ${start.y}] = ${currentCell.pathLength}`)
            return currentCell.pathLength
        }

        queue.push(...getValidNeighbours(currentCell, queue, visited))
        visited.push(currentCell)
    }

    return 9999
}

//first
console.log(`First: ${getPathLength(getPosition('S'))}`)

//second
const allAs = [getPosition('S'), ...getPositions('a')]
const min = Math.min(...allAs.map((cell) => getPathLength(cell)))
console.log(`Second: ${min}`)