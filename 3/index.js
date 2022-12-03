const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const sum = (arr) => arr.reduce((i, c) => i + c, 0)
const getSameItem = (firstArr, secondArr) => firstArr.split('').find(item => secondArr.includes(item))
const getPriority = (item) => {
    const isLowerCase = item.match(/[a-z]/) !== null
    const reference = isLowerCase ? 'a' : 'A'
    const referenceOffset = isLowerCase ? 1 : 27

    return item.charCodeAt(0) - reference.charCodeAt(0) + referenceOffset
}

const input = fs.readFileSync(filePath).toString()
const rucksacks = input.split('\n')

const priorityItems = rucksacks.map(rucksack => getSameItem(rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)))

const firstResult = sum(priorityItems.map(item => getPriority(item)))
console.log(`First: ${firstResult}`)

const chunk = (inputArray, perChunk) => inputArray.reduce((finalArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    finalArray[chunkIndex] = [].concat((finalArray[chunkIndex] || []), item);
    return finalArray
}, [])
const getAllSameItems = (firstStr, secondStr) => firstStr.split('').filter(char => secondStr.includes(char))

const groups = chunk(rucksacks, 3)
const secondResult = sum(
    groups.map(group => getAllSameItems(group[0], group[1]).find(char => group[2].includes(char)))
    .map(badgeChar => getPriority(badgeChar))
)
console.log(`Second: ${secondResult}`)