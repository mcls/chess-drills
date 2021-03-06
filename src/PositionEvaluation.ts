import { POSITIONS } from './helpers'
import { ChessWrapper } from './ChessWrapper';
import { ChessPiece } from './Piece';

export class PositionEvaluation {
    protected chess: ChessWrapper;
    protected nextMoveChess: ChessWrapper;
    protected piece: ChessPiece;
    protected position: string;

    constructor(chess: ChessWrapper, piece: ChessPiece, position: string) {
        this.chess = ChessWrapper.fromFEN(chess.fen())
        this.piece = piece;
        this.position = position
        this.chess.put({ type: piece.type, color: piece.color }, position)

        // The same board after the piece has been put into place and it's now black's move again
        this.nextMoveChess = this.chess.copyWithBlackStart()
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
                const captures = this.nextMoveChess.potentialCaptures(position)
                if (captures.length > 0 ) {
                    responses = responses.concat(captures)
                }
            }
        })
        return responses
    }

    isFork(): boolean {
        return this.potentialCaptures.length > 1
    }

    isSkewer(): boolean {
        if (!this.isSafe() || this.isFork()) {
            return false 
        }
        
        if (this.potentialCaptures.length == 0) return false 
        
        const len = this.potentialCaptures.length
        let skewerFound = false;
        this.potentialCaptures.forEach((cap) => {
            const chess1 = this.chess.copyWithWhiteStart()
            const move = chess1.move(cap)
            // move back
            const chess2 = chess1.copyWithWhiteStart()
            chess2.move({ from: move.to, to: move.from })
            const pe = new PositionEvaluation(chess2.copyWithWhiteStart(), this.piece, this.position)
            if (len == pe.potentialCaptures.length) {
                skewerFound = true; // TODO: short circuit?
            }
        })
        return skewerFound
    }

    isSafe(): boolean {
        return this.threats.length == 0
    }

    ascii(): string {
        return this.chess.ascii()
    }
}