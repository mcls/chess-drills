
export const POSITIONS: Array<string> = ((): Array<string> => {
    const positions: Array<string> = []
    'abcdefgh'.split('').forEach(file => {
        for (let i = 1; i <= 8; i++) {
            const position = `${file}${i}`
            positions.push(position)
        }
    })
    return positions
})()