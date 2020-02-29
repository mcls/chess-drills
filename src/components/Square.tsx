/** @jsx jsx */
import * as React from "react";
import { css, jsx } from '@emotion/core'
import { Piece, PieceColor } from "../helpers"

export interface CellProps { 
    piece?: Piece, 
    rowIndex: number,
    cellIndex: number,
    onClick?(position: string, piece?: Piece):void,
    orientationWhite: Boolean
}

const cellSize = 40;

const cellBaseCSS = css`
  display: block;
  width: ${cellSize}px;
  height: ${cellSize}px;
  line-height: ${cellSize}px;
  float: left;
  font-size: ${cellSize - 5}px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);

  font-weight: bold;
  text-align: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`

const darkCellCSS = css`
  ${cellBaseCSS};
  background-color: #3A3;
`
const lightCellCSS = css`
  ${cellBaseCSS};
  background-color: lightgreen;
`

export class Square extends React.Component<CellProps,{}> {
    get files(): Array<string> { 
        let files = 'abcdefgh'.split('')
        if (this.props.orientationWhite) {
            return files;
        } else {
            return files.reverse();
        }
    }

    get rowNumber(): number {
        if (this.props.orientationWhite) {
            return 8 - this.props.rowIndex;
        } else {
            return this.props.rowIndex + 1;
        }
    }

    get position():string {
        let file = this.files[this.props.cellIndex]
        return [file, this.rowNumber].join('')
    }

    get isDarkCell() {
        let rowIx = this.props.rowIndex
        let cellIx = this.props.cellIndex
        let isDark = false
        if (rowIx % 2 == 0) {
            isDark = !isDark
        }
        if (cellIx % 2 == 0) {
            isDark = !isDark
        } 
        if (!this.props.orientationWhite) {
            isDark = !isDark
        }
        return isDark
    }

    handleClick(e: React.MouseEvent) {
        console.log(this.position, e)
        if (this.props.onClick) {
            this.props.onClick(this.position, this.props.piece)
        }
    }

    render() {
        let content = this.props.piece != null ? this.props.piece.toEmoji() : ''
        let whitePiece = this.props.piece && this.props.piece.color == PieceColor.White
        let style = css`
            ${this.isDarkCell ? darkCellCSS : lightCellCSS}
            color: ${whitePiece ? '#fff' : '#111'}
        `
        return <div css={style}
            title={this.position}
            onClick={this.handleClick.bind(this)}>
            {content}
            </div>
    }
}
