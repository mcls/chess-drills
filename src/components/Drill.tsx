/** @jsx jsx */
import * as React from "react";
import * as _ from 'lodash';
import { css, jsx } from '@emotion/core'

import Board from './Board'
import { Piece, POSITIONS } from "../helpers";
import { PositionEvaluation } from "../PositionEvaluation";
import { ChessWrapper } from "../ChessWrapper";

interface FeedbackProps {
    message: string,
    type: FeedbackType
}
export class Feedback extends React.Component<FeedbackProps, {}> {
    color() {
        switch(this.props.type) {
            case FeedbackType.Good: return "#090"
            case FeedbackType.Bad: return "#F00"
            case FeedbackType.Warning: return "darkorange"
        }
    }

    render() {
        let style = css`
            color: ${this.color()}
        `
        return <p css={style}>{this.props.message}</p>
    }
}

enum FeedbackType {
    Bad = 0,
    Warning = 1,
    Good = 2
}

interface DrillState {
    feedback: string
    feedbackType: FeedbackType
    board: Array<Array<ChessPiece>>
    chess: ChessWrapper
}

interface DrillProps {
}

const drillStyle = css`
    padding: 5px;
    display: inline-block;
    text-align: center;
    border-width: 3px;
    border-style: solid;
    border-color: #333;
`

export class Drill extends React.Component<DrillProps, DrillState> {
    constructor(props: DrillProps) {
        super(props)
        let chess = this.generateRandomBoard()
        this.state = {
            feedback: "-",
            feedbackType: FeedbackType.Good,
            chess: chess,
            board: chess.board(),
        };
    }

    generateRandomBoard(): ChessWrapper {
        const chess = ChessWrapper.fromFEN('8/8/8/8/8/8/8/8 w - - 0 1')
        let randomPosition = _.sample(POSITIONS.filter((pos) => pos != 'd4'))
        chess.put({ type: 'k', color: 'b' }, 'd4')
        chess.put({ type: _.sample(['r', 'n', 'b']), color: 'b' }, randomPosition)
        return chess
    }

    updateBoardWithRandomPosition() {
        let chess = this.generateRandomBoard()
        this.setState({chess: chess, board: chess.board()})
    }

    handleCellClick(position: string, piece: Piece) {
        console.log("position:", position, "piece:", piece)
        if (piece != null) {
            this.setState({
                feedback: "There is already a piece here!",
                feedbackType: FeedbackType.Warning,
            })
            return
        }
        let evaluation = new PositionEvaluation(this.state.chess, { type: "q", color: "w" }, position) 
        let isSkewer = evaluation.isSkewer();
        let isFork = evaluation.isFork();
        console.log("Fork?", isFork)
        console.log("Skewer?", isSkewer)
        console.log("Safe?", evaluation.isSafe())
        console.log("Threats", evaluation.threats)
        
        this.setState({board: evaluation.board()})
        if (!evaluation.isSafe()) {
            this.setState({ 
                feedback: `This is not a safe move! ${evaluation.threats}`,
                feedbackType: FeedbackType.Bad,
            })
        } else if (isFork || isSkewer) {
            let message = _.sample([
                'Wax on, wax off! 🧼',
                'Amazing! ✨',
                'Paint the fence. Up... down. Up! Down! 🎨',
                'Mr. Miagi approves! 👍'
            ])
            this.setState({ 
                feedback: `${message} ${isSkewer ? '🍢' : '🍴'}`,
                feedbackType: FeedbackType.Good,
            })
            
        } else {
            this.setState({ 
                feedback: `This is not a fork or skewer`,
                feedbackType: FeedbackType.Warning,
            })
        }
    }
    
    render() {
        let borderColor = this.state.feedbackType < FeedbackType.Good ? "#F11" : "#efefef"
        let style = css`
            ${drillStyle}
            border-color: ${borderColor};
            font-family: sans-serif;

            button {
                padding: 10px 15px;
                margin: 5px;
                line-height: 12px;
                font-size: 12px;
                border-radius: 3px;
                border: none;
                cursor: pointer;
                box-sizing: border-box;
                text-decoration:none;
                color:#FFFFFF;
                background-color:#3369ff;
                box-shadow: inset -2px -3px 0 0 rgba(0,0,0,0.17);
                text-align: center;
                position:relative;
            }

            button: active{
                top: 0.1em;
                box-shadow: inset 2px 2px 0 0 rgba(0,0,0,0.17);
            }
            
            `
        return <div css={style}>
            <h2>🥋 Chess Dojo 🥋</h2>
            <button onClick={(e) => { this.updateBoardWithRandomPosition() }}>New Position!</button>
            <Board board={this.state.board} onCellClick={this.handleCellClick.bind(this)} />
            <p><code>{this.state.chess.fen()}</code></p>
            <Feedback message={this.state.feedback} type={this.state.feedbackType} />
            </div>
    }
}
