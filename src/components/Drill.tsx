/** @jsx jsx */
import * as React from "react";
import Chess from "chess.js";

import Board from './Board'
import { Piece } from "../helpers";
import { css, jsx } from '@emotion/core'
import { PositionEvaluation } from "../PositionEvaluation";

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
}

interface DrillProps {
    chess: Chess
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
        this.state = {
            feedback: "-",
            feedbackType: FeedbackType.Good,
            board: props.chess.board(),
        };
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
        let evaluation = new PositionEvaluation(this.props.chess, { type: "q", color: "w" }, position) 
        console.log("Fork?", evaluation.isFork())
        console.log("Safe?", evaluation.isSafe())
        console.log("Threats", evaluation.threats)
        console.log(evaluation.ascii())
        
        this.setState({board: evaluation.board()})
        if (!evaluation.isSafe()) {
            this.setState({ 
                feedback: `This is not a safe move! ${evaluation.threats}`,
                feedbackType: FeedbackType.Bad,
            })
        } else if (!evaluation.isFork()) {
            this.setState({ 
                feedback: `This is not a fork`,
                feedbackType: FeedbackType.Warning,
            })
        } else {
            this.setState({ 
                feedback: `Well done! Forking both pieces.`,
                feedbackType: FeedbackType.Good,
            })
        }
    }
    
    render() {
        let borderColor = this.state.feedbackType < FeedbackType.Good ? "#F11" : "#efefef"
        let style = css`
            ${drillStyle}
            border-color: ${borderColor};
            `
        return <div css={style}>
            <Board board={this.state.board} onCellClick={this.handleCellClick.bind(this)} />
            <Feedback message={this.state.feedback} type={this.state.feedbackType} />
            </div>
    }
}
