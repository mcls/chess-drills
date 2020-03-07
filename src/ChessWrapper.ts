import { Chess } from './vendor/chess'
import { POSITIONS } from './helpers'
import { PotentialTacticalPositions } from './PotentialTacticalPositions'

export class ChessWrapper {
    readonly chess: Chess

    constructor(chess: Chess) {
        this.chess = chess
    }

    ascii(): string {
        return this.chess.ascii()
    }

    board(): Array<Array<ChessPiece>> {
        return this.chess.board()
    }

    fen(): string {
        return this.chess.fen()
    }

    get(square: string): ChessPiece {
        return this.chess.get(square)
    }

    put(piece: ChessPiece, position: string): Boolean {
        return this.chess.put(piece, position)
    }

    move(move: string | { from: string, to: string }) {
        return this.chess.move(move)
    }

    moves(options?: { square?: string }): Array<string> {
        return this.chess.moves(options)
    }

    // Extra methods below ----------

    copy() {
        return ChessWrapper.fromFEN(this.fen())
    }

    copyWithWhiteStart(): ChessWrapper {
        return ChessWrapper.fromFEN(this.fen().replace(/b/, "w"))
    }

    copyWithBlackStart(): ChessWrapper {
        return ChessWrapper.fromFEN(this.fen().replace(/w/, "b"))
    }

    potentialCaptures(position: string): Array<string> {
        let legalMoves = this.chess.moves({ square: position })
        return this.onlyKeepCaptures(legalMoves)
    }

    potentialTacticalPositions(piece: ChessPiece): PotentialTacticalPositions {
        let forks: Array<string> = []
        let skewers: Array<string> = []
        POSITIONS.forEach((pos) => {
            if (this.get(pos) != null) return // skip

            let chess = this.copy()
            chess.put(piece, pos)

            let threats = this.threatsFor(pos)
            if (threats.length > 0) {
                return // not a safe position because black can capture back
            }

            let captures = chess.potentialCaptures(pos)
            if (captures.length > 1) {
                forks.push(pos)
                return // don't bother checking for skewers/pins anymore if already a fork
            }

            captures.forEach((cap) => {
                // Capture the piece
                let chess1 = chess.copyWithWhiteStart()
                let move = chess1.move(cap)

                // invalid move (not sure how possible, maybe because of check?)
                if ( move == null ) { 
                    throw("Invalid move: " + cap + ", for FEN: " + chess1.fen()) 
                } 
                
                // Move back to original position
                let chess2 = chess1.copyWithWhiteStart()
                chess2.move({ from: move.to, to: move.from })

                let chess3 = chess2.copyWithWhiteStart()
                // Do we still have the same amount of potential captures? 
                // If so, it meant we discovered an attack and we were thus originally skewering or pinning a piece.
                if (captures.length == chess3.potentialCaptures(move.from).length) {
                    skewers.push(pos)
                }
            })
        })
        return new PotentialTacticalPositions({
            forks: forks,
            skewers: skewers
        })
    }

    // Return all threats for a specific square. Threats as in: who could attack this square.
    threatsFor(newPosition: string): Array<string> {
        let responses: Array<string> = []
        let chess = this.copyWithBlackStart()
        chess.put({ type: 'p', color: 'w' }, newPosition)

        POSITIONS.forEach((position) => {
            if (position != newPosition) {
                let captures = chess.potentialCaptures(position)
                if (captures.length > 0) {
                    responses = responses.concat(captures)
                }
            }
        })
        return responses
    }
    protected onlyKeepCaptures(moves: Array<string>): Array<string> {
        return moves.filter((move) => move.match(/x/))
    }

    static fromFEN(fen: string): ChessWrapper {
        return new ChessWrapper(new Chess(fen))
    }
}