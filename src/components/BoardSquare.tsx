/** @jsx jsx */
import * as React from "react";
import { css, jsx } from '@emotion/core'
import { Piece, PieceColor } from "../helpers"

export enum Highlight {
    Good,
    Bad,
    Neutral
}

export interface CellProps { 
    piece?: Piece; 
    rowIndex: number;
    cellIndex: number;
    position: string;
    onClick?(position: string, piece?: Piece): void;
    orientationWhite: boolean;
    highlight: Highlight;
}

const cellSize = 50;

const cellBaseCSS = css`
  display: block;
  width: ${cellSize}px;
  height: ${cellSize}px;
  line-height: ${cellSize}px;
  float: left;
  font-size: ${cellSize - 5}px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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

export class BoardSquare extends React.Component<CellProps,{}> {
    get rowNumber(): number {
        if (this.props.orientationWhite) {
            return 8 - this.props.rowIndex;
        } else {
            return this.props.rowIndex + 1;
        }
    }

    // TODO: Extract this?
    get isDarkCell() {
        const rowIx = this.props.rowIndex
        const cellIx = this.props.cellIndex
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
        if (this.props.onClick) {
            this.props.onClick(this.props.position, this.props.piece)
        }
    }

    render() {
        const content = this.props.piece != null ? this.props.piece.toEmoji() : ''
        const whitePiece = this.props.piece && this.props.piece.color == PieceColor.White

        let bg = '';
        if (this.props.highlight == Highlight.Good) {
            bg = css`
            border: 3px solid #060;
            line-height: 34px;
            `
        }
        const style = css`
            ${this.isDarkCell ? darkCellCSS : lightCellCSS}
            ${bg}
            color: ${whitePiece ? '#fff' : '#111'}
        `
        
        return <div css={style}
            title={this.props.position}
            onClick={this.handleClick.bind(this)}>
            {content}
            </div>
    }
}
