/** @jsx jsx */
import * as React from "react";
import * as _ from 'lodash';
import { css, jsx } from '@emotion/core'

import Board from './Board'
import { Piece, POSITIONS } from "../helpers";
import { PositionEvaluation } from "../PositionEvaluation";
import { ChessWrapper } from "../ChessWrapper";
import { PotentialTacticalPositions } from "../PotentialTacticalPositions";
import { FeedbackType, Feedback } from "./Feedback";
import { CountdownBar } from "./CountdownBar";




interface DrillState {
    feedback: string
    feedbackType: FeedbackType
    board: Array<Array<ChessPiece>>
    chess: ChessWrapper,
    goodSquares: Array<string>,
    potential: PotentialTacticalPositions,
    timeLeftToNextPosition: number,
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

const WHITE_QUEEN = { type: "q", color: "w" }
const TICK_INTERVAL = 25
const TIME_TO_NEXT_POSITION = 1000

export class Drill extends React.Component<DrillProps, DrillState> {
    constructor(props: DrillProps) {
        super(props)
        let chess = this.generateRandomBoard()
        this.state = {
            feedback: "Click on a square to place a piece!",
            feedbackType: FeedbackType.Neutral,
            chess: chess,
            board: chess.board(),
            goodSquares: [],
            potential: chess.potentialTacticalPositions(WHITE_QUEEN),
            timeLeftToNextPosition: 0,
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
        this.setState({
            chess: chess, 
            board: chess.board(),
            goodSquares: [],
            potential: chess.potentialTacticalPositions(WHITE_QUEEN),
            timeLeftToNextPosition: 0,
        })
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
        let placedPiece = WHITE_QUEEN
        let evaluation = new PositionEvaluation(this.state.chess, placedPiece, position) 
        let isSkewer = evaluation.isSkewer();
        let isFork = evaluation.isFork();
        
        let isGood = false
        if (!evaluation.isSafe()) {
            this.setState({ 
                feedback: `This is not a safe move! ${evaluation.threats}`,
                feedbackType: FeedbackType.Bad,
            })
        } else if (isFork || isSkewer) {
            isGood = true
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
        this.setState({board: evaluation.board()})
        if ( isGood ) {

            let newGoodSquares = _.concat(this.state.goodSquares, [position])
            this.setState({ goodSquares: newGoodSquares })

            // Generate new position if all solutions have been found
            if ( newGoodSquares.length >= this.state.potential.totalCount ) {
                this.setState({ timeLeftToNextPosition: TIME_TO_NEXT_POSITION })
            }
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
        let progressBar = null

        if ( this.state.timeLeftToNextPosition > 0 ) {
            progressBar = <CountdownBar max={this.state.timeLeftToNextPosition} interval={TICK_INTERVAL} onFinished={() => { this.updateBoardWithRandomPosition() }} />
        }
        return <div css={style}>
            <h2>🥋 Chess Dojo 🥋</h2>
            <button onClick={(e) => { this.updateBoardWithRandomPosition() }}>New Position!</button>
            <Board board={this.state.board} 
                goodSquares={this.state.goodSquares}
                onCellClick={this.handleCellClick.bind(this)} />
            <Feedback message={this.state.feedback} type={this.state.feedbackType} />
            <p>You found {this.state.goodSquares.length} of {this.state.potential.totalCount} solutions.</p>
            {progressBar}
            </div>
    }
}
