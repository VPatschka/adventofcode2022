const fs = require('fs')
const path = require('path')

function parseFile(file) {
    const filePath = path.join(__dirname, 'input.txt');

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

    return sensorsWithBeacons
}


function getDistance(first, second) {
    return Math.abs(first.x - second.x) + Math.abs(first.y - second.y)
}

module.exports = { parseFile, getDistance }