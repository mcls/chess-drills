import * as React from "react";
import * as ReactDOM from "react-dom";

import Chess from 'chess.js'
import { Board } from "./components/Board";
import { ChessWrapper, Piece, PositionEvaluation } from "./helpers";

const chess = new Chess(
    // 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19'
    '8/8/8/2k3r1/8/8/8/8 w - - 0 1'
)  

function component() {
    const element = document.createElement('div');
  
    // const chess = new Chess()  

    let ascii = chess.ascii()

    // White pieces
    ascii = ascii.replace(/P/g, "♙")
    ascii = ascii.replace(/R/g, "♖")
    ascii = ascii.replace(/B/g, "♗")
    ascii = ascii.replace(/N/g, "♘")
    ascii = ascii.replace(/Q/g, "♕")
    ascii = ascii.replace(/K/g, "♔")

    // Black pieces
    ascii = ascii.replace(/p/g, "♟")
    ascii = ascii.replace(/r/g, "♜")
    ascii = ascii.replace(/b/g, "♝")
    ascii = ascii.replace(/n/g, "♞")
    ascii = ascii.replace(/q/g, "♛")
    ascii = ascii.replace(/r/g, "♚")

    let html = ascii.split('')
        .map((char) => {
            if (char == '\n') {
                return "<br>"
            } else {
                return "<span style='width: 20px; display: inline-block; text-align: center'>" 
                    + char + "</span>"
            }
            
        })
        .join('')
    element.innerHTML = "<div style='font-size: 20px'>" + html + "</div>"
  
    return element;
  }
  
// document.body.appendChild(component());

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
    if (!evaluation.isFork()) {
        alert("Nope, this is not a fork")
    }
    if (!evaluation.isSafe()) {
        alert(`This is not a safe move! ${evaluation.threats}`)
    }
}

ReactDOM.render(
    <Board chess={chess} onCellClick={onCellClick} />,
    document.getElementById("app-root")
);