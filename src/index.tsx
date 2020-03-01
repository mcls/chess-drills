import * as React from "react";
import * as ReactDOM from "react-dom";

import { Drill } from "./components/Drill";
import { Chess } from "./vendor/chess.js";
import { POSITIONS } from "./helpers"

let root = document.createElement('div');
root.setAttribute("id", "app-root");
document.body.appendChild(root)

ReactDOM.render(
    <Drill />,
    document.getElementById("app-root")
);