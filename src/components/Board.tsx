/** @jsx jsx */
import * as React from "react";
import Chess from "chess.js";
import { css, jsx } from '@emotion/core'


import { Piece, pieceFromChessJS } from "../helpers"
import { Square } from "./Square"

export interface BoardProps { 
    chess: Chess; 
    onCellClick?(position: string, piece?: Piece):void,
}
export interface RowProps { 
    rowIndex: number,
    cells: Array<{type: string, color: string}>
    onCellClick?(position: string, piece?: Piece):void,
}

const rowCss = css`
  overflow: hidden;
  // border: 1px solid #333;
`

export class Row extends React.Component<RowProps,{}> {
    render () {
        return <div css={rowCss}>
            {this.props.cells.map((cell, ix) => {
                return <Square key={ix} 
                    rowIndex={this.props.rowIndex} 
                    cellIndex={ix} 
                    orientationWhite={true}
                    onClick={this.props.onCellClick}
                    piece={pieceFromChessJS(cell)} />
            })}
        </div>
    }
}

export class Board extends React.Component<BoardProps, {}> {
    render() {
        let board = this.props.chess.board()
        console.log(board)

        return <div>
                <h1>Board</h1>
                {board.map((row, ix) => <Row key={ix} cells={row} rowIndex={ix} onCellClick={this.props.onCellClick} />)}
            </div>
    }
}