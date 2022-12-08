const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const sum = (arr) => arr.reduce((i, c) => i + c, 0)

class File {
    constructor(name, size) {
        this.name = name
        this.size = parseInt(size)
    }
}

class Directory {
    constructor(name, parent) {
        this.name = name
        this.parent = parent

        this.directories = []
        this.files = []
        this.size = null
    }

    addDirectory(directoryName) {
        this.directories = [...this.directories, new Directory(directoryName, this)]
    }

    addFile(fileName, fileSize) {
        this.files = [...this.files, new File(fileName, fileSize)]
    }

    moveDown(dirName) {
        const existingDirectory = this.directories.find(child => child.name === dirName)
        if (existingDirectory) {
            return existingDirectory
        }

        this.addDirectory(dirName)
        return this.directories[this.directories.length - 1]
    }

    moveUp() {
        return this.parent
    }

    getSize() {
        if (this.size === null) {
            const dirSizes = sum(this.directories.map(directory => directory.getSize()))
            const fileSizes = sum(this.files.map(file => file.size))

            this.size = dirSizes + fileSizes
        }

        return this.size
    }

    find(predicate) {
        const filtered = this.directories.flatMap(directory => directory.find(predicate))

        return [...filtered, ...(predicate(this) ? [this] : [])]
    }
}

const input = fs.readFileSync(filePath).toString()

const instructions = input.split('\n').slice(1) // remove root instruction

const rootDirectory = new Directory('/')
let currentDirectory = rootDirectory
for (const instruction of instructions) {
    const instructionParts = instruction.split(' ')

    switch (instructionParts[0]) {
        case '$':
            switch (instructionParts[1]) {
                case 'cd':
                    if (instructionParts[2] === '..') {
                        currentDirectory = currentDirectory.moveUp()
                    } else {
                        currentDirectory = currentDirectory.moveDown(instructionParts[2])
                    }
                    break
                case 'ls':
                    // nothing
                    break
            }
            break
        case 'dir':
            currentDirectory.addDirectory(instructionParts[1])
            break
        default: // file
            currentDirectory.addFile(instructionParts[1], instructionParts[0])
            break
    }
}

rootDirectory.getSize()
const directoriesUnder100000 = rootDirectory.find((directory) => directory.getSize() < 100000)
const sumOfSizesOfDirectoriesUnder100000 = sum(directoriesUnder100000.map(directory => directory.getSize()))

console.log(`First: ${sumOfSizesOfDirectoriesUnder100000}`)

const maxSpace = 70000000
const requiredSpace = 30000000
const availableSpace = maxSpace - rootDirectory.getSize()
const missingSpace = requiredSpace - availableSpace

const directoriesOverMissingSpace = rootDirectory.find((directory) => directory.getSize() > missingSpace)
directoriesOverMissingSpace.sort((first, second) => first.getSize() - second.getSize())

console.log(`Second: ${directoriesOverMissingSpace[0].getSize()}`)
