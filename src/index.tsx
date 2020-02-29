import * as React from "react";
import * as ReactDOM from "react-dom";

import { Drill } from "./components/Drill";
import Chess from "chess.js";

let root = document.createElement('div');
root.setAttribute("id", "app-root");
document.body.appendChild(root)

const chess = new Chess(
    // 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19'
    '8/8/8/2k3r1/8/8/8/8 w - - 0 1'
)  
ReactDOM.render(
    <Drill chess={chess} />,
    document.getElementById("app-root")
);