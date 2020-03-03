/** @jsx jsx */
import * as React from "react";
import { css, jsx } from '@emotion/core'
import * as _ from 'lodash';

import { Piece, pieceFromChessJS } from "../helpers"
import { BoardSquare, Highlight } from "./BoardSquare"

export interface BoardProps {
    board: Array<Array<ChessPiece>>;
    onCellClick?(position: string, piece?: Piece): void,
    goodSquares: Array<string>
}
export interface RowProps {
    rowIndex: number,
    cells: Array<{ type: string, color: string }>
    onCellClick?(position: string, piece?: Piece): void,
    goodSquares: Array<string>
}

const rowCss = css`
  overflow: hidden;
  // border: 1px solid #333;
`

export class Row extends React.Component<RowProps, {}> {
    positionFor(ixFile: number, ixRow: number): string {
        let file = 'abcdefgh'.split('')[ixFile]
        return [file, 8 - ixRow].join('')
    }

    highlightFor(position: string) {
        if (_.includes(this.props.goodSquares, position)) {
            return Highlight.Good
        }
        return Highlight.Neutral
    }

    render() {
        return <div css={rowCss}>
            {this.props.cells.map((cell, ixCol) => {
                let position = this.positionFor(ixCol, this.props.rowIndex)
                return <BoardSquare key={ixCol}
                    rowIndex={this.props.rowIndex}
                    cellIndex={ixCol}
                    position={position}
                    orientationWhite={true}
                    highlight={this.highlightFor(position)}
                    onClick={this.props.onCellClick}
                    piece={pieceFromChessJS(cell)} />
            })}
        </div>
    }
}

export default class Board extends React.Component<BoardProps, {}> {
    render() {
        let board = this.props.board
        return <div>
            {board.map((row, ix) => {
                return <Row key={ix} cells={row} rowIndex={ix} 
                    goodSquares={this.props.goodSquares}
                    onCellClick={this.props.onCellClick} />
            })}
        </div>
    }
}