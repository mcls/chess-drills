import Chess from 'chess.js'

export class PositionEvaluation {
    protected chess: Chess;
    protected nextMoveChess: Chess;
    protected piece: ChessPiece;
    protected position: string;

    constructor(chess: Chess, piece: ChessPiece, position: string) {
        this.chess = new Chess(chess.fen())
        this.piece = piece;
        this.position = position;
        this.chess.put({ type: piece.type, color: piece.color }, position)

        // The same board after the piece has been put into place and it's now black's move again
        this.nextMoveChess = new Chess(this.chess.fen().replace(/w/, 'b'))
    }

    board(): Array<Array<ChessPiece>> {
        return this.chess.board()
    }

    get potentialCaptures(): Array<string> {
        let legalMoves = this.chess.moves({ square: this.position })
        return this.onlyKeepCaptures(legalMoves)
    }

    get threats(): Array<string> {
        let responses: Array<string> = []
        'abcdefgh'.split('').forEach(file => {
            for (let i = 1; i <= 8; i++) {
                let position = `${file}${i}`
                if (position != this.position) {
                    let captures = this.onlyKeepCaptures(this.nextMoveChess.moves({ square: position }))
                    if (captures.length > 0 ) {
                        responses = responses.concat(captures)
                    }
                }
            }
        });
        return responses
    }

    isFork(): Boolean {
        return this.potentialCaptures.length > 1
    }

    isSkewer(): Boolean {
        if (!this.isSafe()) {
            return false 
        }
        
        // TODO: Implement
    }

    isSafe(): Boolean {
        return this.threats.length == 0
    }

    ascii(): string {
        return this.chess.ascii()
    }

    protected onlyKeepCaptures(moves: Array<string>): Array<string> {
        return moves.filter((move) => move.match(/x/))
    }
}