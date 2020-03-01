import { Chess } from './vendor/chess'
import { POSITIONS } from './helpers'

export class ChessDecorator {
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
        return new ChessDecorator(new Chess(this.fen()))
    }

    copyWithWhiteStart(): ChessDecorator {
        return new ChessDecorator(new Chess(this.chess.fen().replace(/b/, "w")))
    }

    potentialCaptures(position: string): Array<string> {
        let legalMoves = this.chess.moves({ square: position })
        return this.onlyKeepCaptures(legalMoves)
    }

    protected onlyKeepCaptures(moves: Array<string>): Array<string> {
        return moves.filter((move) => move.match(/x/))
    }
}

export class PositionEvaluation {
    protected chess: ChessDecorator;
    protected nextMoveChess: ChessDecorator;
    protected piece: ChessPiece;
    protected position: string;

    constructor(chess: Chess, piece: ChessPiece, position: string) {
        this.chess = new ChessDecorator(new Chess(chess.fen()))
        this.piece = piece;
        this.position = position
        this.chess.put({ type: piece.type, color: piece.color }, position)

        // The same board after the piece has been put into place and it's now black's move again
        this.nextMoveChess = new ChessDecorator(new Chess(this.chess.fen().replace(/w/, 'b')))
    }

    board(): Array<Array<ChessPiece>> {
        return this.chess.board()
    }

    get potentialCaptures(): Array<string> {
        return this.chess.potentialCaptures(this.position)
    }

    get threats(): Array<string> {
        let responses: Array<string> = []
        POSITIONS.forEach((position) => {
            if (position != this.position) {
                let captures = this.nextMoveChess.potentialCaptures(position)
                if (captures.length > 0 ) {
                    responses = responses.concat(captures)
                }
            }
        })
        return responses
    }

    isFork(): Boolean {
        return this.potentialCaptures.length > 1
    }

    isSkewer(): Boolean {
        if (!this.isSafe() || this.isFork()) {
            return false 
        }
        
        if (this.potentialCaptures.length == 0) return false 
        
        let len = this.potentialCaptures.length
        let skewerFound = false;
        this.potentialCaptures.forEach((cap) => {
            let chess1 = this.chess.copyWithWhiteStart()
            let move = chess1.move(cap)
            // move back
            let chess2 = chess1.copyWithWhiteStart()
            chess2.move({ from: move.to, to: move.from })
            let pe = new PositionEvaluation(chess2.copyWithWhiteStart().chess, this.piece, this.position)
            if (len == pe.potentialCaptures.length) {
                skewerFound = true; // TODO: short circuit?
            }
        })
        return skewerFound
    }

    copyChessWithWhiteStart(chess: Chess):Chess {
        return new Chess(chess.fen().replace(/b/, "w"))
    }

    isSafe(): Boolean {
        return this.threats.length == 0
    }

    ascii(): string {
        return this.chess.ascii()
    }
}