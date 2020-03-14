import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

const root = document.createElement('div');
root.setAttribute("id", "app-root");
document.body.appendChild(root)

ReactDOM.render(
    <App />,
    document.getElementById("app-root")
);