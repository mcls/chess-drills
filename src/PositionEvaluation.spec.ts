import { PositionEvaluation } from "./PositionEvaluation"

import { Chess } from './vendor/chess';

describe("PositionEvaluation", () => {
    describe("isFork()", () => {
        it("works", () => {
            console.log("--------------------------------")
            console.log(Chess)
            let fen = '8/8/8/2k3r1/8/8/8/8 w - - 0 1' 
            let chess = new Chess(fen)
            let pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, 'e7')
            expect(pe.isFork()).toEqual(true)
        })
    })
})