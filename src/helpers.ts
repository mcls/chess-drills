import { PieceType, PieceColor, Piece } from "./Piece";

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
    switch (key) {
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