import { Chess } from './vendor/chess'
import { POSITIONS } from './helpers'

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
        return new ChessWrapper(new Chess(this.chess.fen().replace(/b/, "w")))
    }

    copyWithBlackStart(): ChessWrapper {
        return new ChessWrapper(new Chess(this.chess.fen().replace(/w/, "b")))
    }

    potentialCaptures(position: string): Array<string> {
        let legalMoves = this.chess.moves({ square: position })
        return this.onlyKeepCaptures(legalMoves)
    }

    protected onlyKeepCaptures(moves: Array<string>): Array<string> {
        return moves.filter((move) => move.match(/x/))
    }

    static fromFEN(fen: string): ChessWrapper {
        return new ChessWrapper(new Chess(fen))
    }
}