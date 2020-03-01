import { ChessWrapper } from './ChessWrapper'

describe("ChessWrapper", () => {
    const WHITE_QUEEN = { color: 'w', type: 'q' }
    const WHITE_KNIGHT = { color: 'w', type: 'n' }

    describe("potentialCaptures()", () => {
        it("works", () => {
            let cw = ChessWrapper.fromFEN("8/8/8/8/3k4/8/8/2r5 w - - 0 1")
            cw.put(WHITE_QUEEN, 'd2')
            expect(cw.potentialCaptures('d2').sort()).toEqual(["Qxc1", "Qxd4"])
            cw.put(WHITE_KNIGHT, 'd2')
            expect(cw.potentialCaptures('d2')).toEqual([])
        })
    })

    describe("threatsFor()", () => {
        it("works", () => {
            let cw = ChessWrapper.fromFEN("8/8/8/8/3k4/8/8/2r5 w - - 0 1")
            expect(cw.threatsFor('d3')).toEqual(["Kxd3"])
            expect(cw.threatsFor('e4')).toEqual(["Kxe4"])
        })
    })

    describe("potentialForkPosistions()", () => {
        it("works", () => {
            let cw = ChessWrapper.fromFEN("8/8/8/8/3k4/8/8/2r5 w - - 0 1")
            // cw.put(WHITE_QUEEN, 'd2')
            let positions = cw.potentialForkPositions(WHITE_QUEEN)
            expect(positions.sort()).toEqual(["b2", "d2", "f4"])
        })
    })
})