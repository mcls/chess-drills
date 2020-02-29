
// https://github.com/jhlywa/chess.js

export declare class Chess {
    constructor(fen: string)

    /**
     * Returns a string containing an ASCII diagram of the current position.
     */
    ascii(): string
    /**
     * Returns an 2D array representation of the current position. Empty squares are represented by null.
     */
    board(): Array<Array<ChessPiece>>
    /**
     * Returns the FEN string for the current position.
     */
    fen(): string
    /**
     * Returns the piece on the square
     * @param square 
     */
    get(square: string): ChessPiece
    /**
     * Place a piece on the square where piece is an object with the form { type: ..., color: ... }. 
     * Returns true if the piece was successfully placed, otherwise, the board remains unchanged and false is returned. 
     * put() will fail when passed an invalid piece or square, or when two or more kings of the same color are placed.
     * @param piece 
     * @param position For example "a1", "d4", "e4", etc.
     */
    put(piece: ChessPiece, position: string): Boolean
    /**
     * Returns a list of legal moves from the current position. 
     * The function takes an optional parameter which controls the single-square move generation and verbosity.
     */
    moves(options?: { square?: string }): Array<string>
}

export default Chess;
