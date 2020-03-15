export interface ChessPiece {
    type: string;
    color: string;
}

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
        }
        else {
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
