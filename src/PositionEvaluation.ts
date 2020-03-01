import { Chess } from './vendor/chess'

export class PositionEvaluation {
    protected chess: Chess;
    protected nextMoveChess: Chess;
    protected piece: ChessPiece;
    protected position: string;

    constructor(chess: Chess, piece: ChessPiece, position: string) {
        console.log(Chess)
        this.chess = new Chess(chess.fen())
        this.piece = piece;
        this.position = position
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
        if (!this.isSafe() || this.isFork()) {
            return false 
        }
        
        if (this.potentialCaptures.length == 0) return false 
        
        let len = this.potentialCaptures.length
        let skewerFound = false;
        this.potentialCaptures.filter((cap) => {
            let chess1 = this.copyChessWithWhiteStart(this.chess)
            let move = chess1.move(cap)
            // move back
            let copyChess = this.copyChessWithWhiteStart(chess1)
            console.log(copyChess.move({ from: move.to, to: move.from }))
            let pe = new PositionEvaluation(this.copyChessWithWhiteStart(copyChess), this.piece, this.position)
            console.log(len, pe.potentialCaptures.length)
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

    protected onlyKeepCaptures(moves: Array<string>): Array<string> {
        return moves.filter((move) => move.match(/x/))
    }
}