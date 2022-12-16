const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString()
const pairs = input.split('\n\n').map(pair => pair.split('\n'))

class List {
    constructor() {
        this.list = []
    }
    add(item) {
        this.list.push(item)
        if (item instanceof List) {
            item.setParent(this)
        }
    }
    setParent(list) {
        this.parent = list
    }
    getParent() {
        return this.parent
    }
    toString() {
        return `[${this.list.map(item => item.toString()).join(',')}]`
    }
    length() {
        return this.list.length
    }
}

function packetToList(packet) {
    const chars = packet.split('').slice(1)
    const start = new List()

    let current = start
    let lastNumber = ''
    for (const char of chars) {
        switch (char) {
            case '[':
                const newLine = new List()
                current.add(newLine)
                current = newLine
                break
            case ',':
                if (lastNumber !== '') {
                    current.add(parseInt(lastNumber))
                    lastNumber = ''
                }
                break
            case ']':
                if (lastNumber !== '') {
                    current.add(parseInt(lastNumber))
                    lastNumber = ''
                }
                current = current.getParent()
                break
            default:
                lastNumber += char
                break
        }
    }

    return start
}

function convertIntToList(parent, item) {
    const output = new List()
    output.add(item)
    output.setParent(parent)

    return output
}

function checkPacket(first, second, firstParent, secondParent) {
    if (typeof first === 'number' && typeof second === 'number') {
        if (first === second) {
            return null
        }

        return first < second
    }

    if (first instanceof List && second instanceof List) {
        for (let i = 0; i < first.length(); i++) {
            if (i >= second.length()) {
                return false
            }

            const result = checkPacket(first.list[i], second.list[i], first, second)
            if (result !== null) {
                return result
            }
        }

        if (first.length() < second.length()) {
            return true
        }

        return null
    }

    const firstAsList = first instanceof List ? first : convertIntToList(firstParent, first)
    const secondAsList = second instanceof List ? second : convertIntToList(secondParent, second)
    return checkPacket(firstAsList, secondAsList)
}

let firstResult = 0
for (const pairIndex in pairs) {
    const first = packetToList(pairs[pairIndex][0])
    const second = packetToList(pairs[pairIndex][1])
    const result = checkPacket(first, second, undefined, undefined)
    if (result) {
        firstResult += parseInt(pairIndex) + 1
    }
}

console.log(`First: ${firstResult}`)

function bubbleSort(arr) {
    let finished = false
    do {
        finished = true
        for (let i = 0; i <= arr.length - 2; i++) {
            const result = checkPacket(arr[i], arr[i + 1])
            // console.log(result)
            if (result === null) {
                console.log(arr[i].toString(), arr[i + 1].toString())
                return
            }

            if (result === false) {
                const tmp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = tmp
                finished = false
                break
                // const copy = [...arr]
                // const tmp = copy[i]
                // copy[i] = copy[i + 1]
                // copy[i + 1] = tmp

                // console.log(packetsToString(copy))
                // return bubbleSort(copy)
            }
        }

    } while (!finished)

    return arr
}

const firstDivider = packetToList('[[2]]')
const secondDivider = packetToList('[[6]]')
const allPackets = [firstDivider, secondDivider, ...pairs.flatMap(pair => pair).map(packet => packetToList(packet))]

const sortedResult = bubbleSort(allPackets)

const firstIndex = sortedResult.indexOf(firstDivider) + 1
const secondIndex = sortedResult.indexOf(secondDivider) + 1

console.log(`Second: ${firstIndex * secondIndex}`)
