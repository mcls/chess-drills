import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';


import { Drill } from "./components/Drill";
import { Chess } from "./vendor/chess.js";
import { POSITIONS } from "./helpers"

let root = document.createElement('div');
root.setAttribute("id", "app-root");
document.body.appendChild(root)

/*
const chess = new Chess(
    // 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19'
    _.sample([
        '8/8/8/2k3r1/8/8/8/8 w - - 0 1',
        '8/8/8/2k5/5r2/8/8/8 w - - 0 1',
    ])
)  
*/

const chess = new Chess('8/8/8/2k5/8/8/8/8 w - - 0 1')
let randomPosition = _.sample(POSITIONS)
chess.put({ type: 'r', color: 'b' }, randomPosition)
ReactDOM.render(
    <Drill chess={chess} />,
    document.getElementById("app-root")
);