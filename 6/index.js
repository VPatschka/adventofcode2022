const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');
const markerLength = 14 // First = 4

const input = fs.readFileSync(filePath).toString()

for (let i = 0; i < input.length; i++) {
    if (i - markerLength < 0) {
        continue
    }

    const partToCheck = input.slice(i - markerLength, i).split('')
    const uniqueCharCount = [...new Set(partToCheck)].length
    if (uniqueCharCount === markerLength) {
        console.log(`Result: ${i}`)
        return
    }
}
