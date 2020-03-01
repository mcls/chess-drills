import { PositionEvaluation } from "./PositionEvaluation"

import { Chess } from './vendor/chess';

describe("PositionEvaluation", () => {
    describe("isFork()", () => {
        it("works", () => {
            let testFork = (fen: string, position: string, flag: Boolean) => {
                let chess = new Chess(fen)
                let pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, position)
                expect(pe.isFork()).toEqual(flag)
            }
            let fen = '8/8/8/2k3r1/8/8/8/8 w - - 0 1' 
            let chess = new Chess(fen)
            let pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, 'e7')
            expect(pe.isFork()).toEqual(true)
            testFork(fen, 'e7', true)
            testFork(fen, 'e6', false)
        })
    })

    describe("isSkewer()", () => {
        it("works", () => {
            let testSkewer = (fen: string, position: string, flag: Boolean) => {
                let chess = new Chess(fen)
                let pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, position)
                expect(pe.isSkewer()).toEqual(flag)
            }
            testSkewer('8/8/8/2k3r1/8/8/8/8 w - - 0 1' , 'b5', false)
            testSkewer('8/8/8/2k3r1/8/8/8/8 w - - 0 1' , 'a5', true)
            testSkewer('8/8/8/2k3r1/8/8/8/8 w - - 0 1' , 'c7', false)
        })
    })
})