import { PositionEvaluation } from "./PositionEvaluation"
import { ChessWrapper } from "./ChessWrapper";

describe("PositionEvaluation", () => {
    describe("isFork()", () => {
        it("works", () => {
            const testFork = (fen: string, position: string, flag: boolean): void => {
                const chess = ChessWrapper.fromFEN(fen)
                const pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, position)
                expect(pe.isFork()).toEqual(flag)
            }
            const fen = '8/8/8/2k3r1/8/8/8/8 w - - 0 1' 
            const chess = ChessWrapper.fromFEN(fen)
            const pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, 'e7')
            expect(pe.isFork()).toEqual(true)
            testFork(fen, 'e7', true)
            testFork(fen, 'e6', false)
        })
    })

    describe("isSkewer()", () => {
        it("works", () => {
            const testSkewer = (fen: string, position: string, flag: boolean): void => {
                const chess = ChessWrapper.fromFEN(fen)
                const pe = new PositionEvaluation(chess, { type: 'q', color: 'w'}, position)
                expect(pe.isSkewer()).toEqual(flag)
            }
            testSkewer('8/8/8/2k3r1/8/8/8/8 w - - 0 1' , 'b5', false)
            testSkewer('8/8/8/2k3r1/8/8/8/8 w - - 0 1' , 'a5', true)
            testSkewer('8/8/8/2k3r1/8/8/8/8 w - - 0 1' , 'c7', false)
        })
    })
})