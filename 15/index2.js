const {getDistance, parseFile} = require("./helper");
const {mergeIntervals} = require("./interval");

const sensorsWithBeacons = parseFile('input.txt')

const sensorsWithDistance = []
for (const sensorWithBeacon of sensorsWithBeacons) {
    const {sensor, beacon} = sensorWithBeacon
    const distance = getDistance(sensor, beacon)
    sensorsWithDistance.push({...sensor, distance})
}

for (let checkY = 0; checkY < 4000000; checkY++) {
    let intervalsNotPresent = []
    for (const sensor of sensorsWithDistance) {
        const { x, y, distance } = sensor
        const yPoint = {x: sensor.x, y: checkY}
        const yDistance = getDistance(sensor, yPoint)
        if (yDistance > distance) {
            continue
        }
        const distanceDifference = distance - yDistance
        intervalsNotPresent.push({from: sensor.x - distanceDifference, to: sensor.x + distanceDifference})
    }
    const finalInterval = mergeIntervals(intervalsNotPresent)
    if(finalInterval.length > 1) {
        console.log(checkY)
        console.log(finalInterval)
        const minTo = Math.min(...finalInterval.map(({to}) => to))
        console.log(`Result: ${(minTo + 1) * 4000000 + checkY}`)
        return
    }
}
