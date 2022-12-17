const fs = require('fs')
const path = require('path')
const {mergeIntervals} = require("./interval");
const filePath = path.join(__dirname, 'input.txt');
const checkY = 2000000

const input = fs.readFileSync(filePath).toString()
const lines = input.split('\n')

const sensorsWithBeacons = []
for (const line of lines) {
    const [sensorLine, beaconLine] = line.split(':')
    const sensorLineSplit = sensorLine.split(/[,=]/g)
    const beaconLineSplit = beaconLine.split(/[,=]/g)
    const sX = parseInt(sensorLineSplit[1])
    const sY = parseInt(sensorLineSplit[3])
    const bX = parseInt(beaconLineSplit[1])
    const bY = parseInt(beaconLineSplit[3])

    sensorsWithBeacons.push({
        sensor: { x: sX, y: sY },
        beacon: { x: bX, y: bY },
    })
}

function getDistance(first, second) {
    return Math.abs(first.x - second.x) + Math.abs(first.y - second.y)
}

const intervalsNotPresent = []
for (const sensorWithBeacon of sensorsWithBeacons) {
    const { sensor, beacon } = sensorWithBeacon
    const distance = getDistance(sensor, beacon)
    const yPoint = { x: sensor.x, y: checkY }
    const yDistance = getDistance(sensor, yPoint)

    if (yDistance > distance) {
        continue
    }

    const distanceDifference = distance - yDistance
    intervalsNotPresent.push({ from: sensor.x - distanceDifference, to: sensor.x + distanceDifference })
}

const finalInterval = mergeIntervals(intervalsNotPresent)[0]

const beaconsOnLineXs = sensorsWithBeacons.map(({beacon}) => beacon).filter(({y}) => y === checkY).map(({x}) => x)

const uniqueBeaconXsInInterval = [...new Set(beaconsOnLineXs)].filter(x => finalInterval.from <= x && finalInterval.to >= x).length
const result = (finalInterval.to - finalInterval.from) + 1
console.log()
console.log(finalInterval)
console.log(`Result: ${result - uniqueBeaconXsInInterval}`)