import * as React from "react";
import * as ReactDOM from "react-dom";

import Chess from 'chess.js'
import { Board } from "./components/Board";
import { Piece, PositionEvaluation } from "./helpers";

const chess = new Chess(
    // 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19'
    '8/8/8/2k3r1/8/8/8/8 w - - 0 1'
)  

let root = document.createElement('div');
root.setAttribute("id", "app-root");
document.body.appendChild(root)

function onCellClick(position: string, piece: Piece) {
    console.log("position:", position, "piece:", piece)
    if (piece != null) {
        console.log("There is already a piece here!")
        return
    }
    let evaluation = new PositionEvaluation(chess, { type: "q", color: "w" }, position) 
    console.log("Fork?", evaluation.isFork())
    console.log("Safe?", evaluation.isSafe())
    console.log("Threats", evaluation.threats)
    console.log(evaluation.ascii())
    
    if (!evaluation.isSafe()) {
        alert(`This is not a safe move! ${evaluation.threats}`)
    } else if (!evaluation.isFork()) {
        alert("Nope, this is not a fork")
    }
}

ReactDOM.render(
    <Board chess={chess} onCellClick={onCellClick} />,
    document.getElementById("app-root")
);