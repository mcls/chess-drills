import Chess from 'chess.js'

export enum PieceColor {
    White = 'w',
    Black = 'b'
}

export enum PieceType {
    Pawn = 'p',
    Rook = 'r',
    Bishop = 'b',
    Knight = 'n',
    Queen = 'q',
    King = 'k'
}

export class Piece {
    type: PieceType;
    color: PieceColor;

    constructor(type: PieceType, color: PieceColor) {
        this.type = type;
        this.color = color;
    }

    toEmoji():string {
        if (this.color == PieceColor.White) {
            switch (this.type) {
                case PieceType.Pawn: return "♙";
                case PieceType.Rook: return "♖";
                case PieceType.Knight: return "♘";
                case PieceType.Bishop: return "♗";
                case PieceType.Queen: return "♕";
                case PieceType.King: return "♔";
            }
        } else {
            switch (this.type) {
                case PieceType.Pawn: return "♟";
                case PieceType.Rook: return "♜";
                case PieceType.Knight: return "♞";
                case PieceType.Bishop: return "♝";
                case PieceType.Queen: return "♕";
                case PieceType.King: return "♚";
            }
        }
    }
}

export function pieceFromChessJS(piece:{type: string, color: string}):Piece {
    if (piece == null) return null
    return new Piece(stringToPieceType(piece.type), stringToPieceColor(piece.color))
}

function stringToPieceType(key: string):PieceType {
    switch ( key ){
        case 'p': return PieceType.Pawn;
        case 'k': return PieceType.King;
        case 'q': return PieceType.Queen;
        case 'r': return PieceType.Rook;
        case 'b': return PieceType.Bishop;
        case 'n': return PieceType.Knight;
    }

    throw "Can't find PieceType for key: " + key
}

function stringToPieceColor(key: string):PieceColor {
    switch ( key ){
        case 'w': return PieceColor.White;
        case 'b': return PieceColor.Black;
    }

    throw "Can't find PieceType for key: " + key
}

export class PositionEvaluation {
    protected chess: Chess;
    protected piece: ChessPiece;
    protected position: string;

    constructor(chess: Chess, piece: ChessPiece, position: string) {
        this.chess = new Chess(chess.fen())
        this.piece = piece;
        this.position = position;
        this.chess.put({ type: piece.type, color: piece.color }, position)
    }

    get potentialCaptures(): Array<string> {
        let legalMoves = this.chess.moves({ square: this.position })
        return this.onlyKeepCaptures(legalMoves)
    }

    get threats(): Array<string> {
        let fen = this.chess.fen().replace(/w/, 'b')
        console.log(fen)
        let nextChess = new Chess(fen)
        console.log("........")
        let responses: Array<string> = []
        'abcdefgh'.split('').forEach(file => {
            for (let i = 1; i <= 8; i++) {
                let position = `${file}${i}`
                if (position != this.position) {
                    let captures = this.onlyKeepCaptures(nextChess.moves({ square: position }))
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