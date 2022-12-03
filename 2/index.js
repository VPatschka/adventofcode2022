const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt');

const winningRounds = ['AY', 'BZ', 'CX']

const sum = (arr) => arr.reduce((i, c) => i + c, 0)
const scorePerHand = (hand) => hand.charCodeAt(0) - 'X'.charCodeAt(0) + 1
const handsAreEqual = (round) => round.charCodeAt(0) - round.charCodeAt(1) === 'A'.charCodeAt(0) - 'X'.charCodeAt(0)
const scorePerRound = (round) => handsAreEqual(round) ? 3 : (winningRounds.includes(round) ? 6 : 0)

const input = fs.readFileSync(filePath).toString()
const rounds = input.replace(/ /g, '').split('\n')

const result = sum(rounds.map(round => scorePerHand(round[1]) + scorePerRound(round)))

console.log(`First: ${result}`)

const secondScorePerRound = (round) => (round.charCodeAt(1) - 'X'.charCodeAt(0)) * 3

const scoreOpponentHandMinusOne = (hand) => hand.charCodeAt(0) - 'A'.charCodeAt(0)
const changeOfHandScoreOnResult = (round) => (round.charCodeAt(1) - 'X'.charCodeAt(0) + 2) % 3
const secondScorePerHand = (round) => (scoreOpponentHandMinusOne(round[0]) + changeOfHandScoreOnResult(round)) % 3 + 1

const result2 = sum(rounds.map(round => secondScorePerHand(round) + secondScorePerRound(round)))

console.log(`Second: ${result2}`)