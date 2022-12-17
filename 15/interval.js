function intervalIntersects(first, second) {
    return first.from <= second.to && first.to >= second.from
}

function isInside(outer, inner) {
    return outer.from <= inner.from && outer.to >= inner.to
}

function mergeIntervals(intervals) {
    let output = [...intervals]
    let merged = false
    do {
        merged = false
        for (let i = 0; i < output.length && !merged; i++) {
            for (let j = i + 1; j < output.length && !merged; j++) {
                const first = output[i]
                const second = output[j]
                if (isInside(first, second)) {
                    output = output.filter(value => value !== second)
                    merged = true
                    break
                } else if (isInside(second, first)) {
                    output = output.filter(value => value !== first)
                    merged = true
                    break
                } else if (intervalIntersects(first, second)) {
                    const minFrom = Math.min(first.from, second.from)
                    const maxTo = Math.max(first.to, second.to)
                    output = output.filter(value => value !== first && value !== second)
                    output.push({ from: minFrom, to: maxTo })
                    merged = true
                    break
                }
            }
        }
    } while (merged)

    return output
}

module.exports = { mergeIntervals }