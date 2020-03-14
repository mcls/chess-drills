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

    toEmoji(): string {
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

function stringToPieceType(key: string): PieceType {
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

function stringToPieceColor(key: string): PieceColor {
    switch ( key ){
        case 'w': return PieceColor.White;
        case 'b': return PieceColor.Black;
    }

    throw "Can't find PieceType for key: " + key
}

export function pieceFromChessJS(piece: {type: string; color: string}): Piece {
    if (piece == null) return null
    return new Piece(stringToPieceType(piece.type), stringToPieceColor(piece.color))
}

export const POSITIONS: Array<string> = ((): Array<string> => {
    const positions: Array<string> = []
    'abcdefgh'.split('').forEach(file => {
        for (let i = 1; i <= 8; i++) {
            const position = `${file}${i}`
            positions.push(position)
        }
    })
    return positions
})()