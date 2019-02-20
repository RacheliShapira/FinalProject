import React from "react";
import ReactDOM from "react-dom";

import { Welcome } from "./welcome";
import App from "./app";

let whatToRender;
if (location.pathname == "/welcome") {
    whatToRender = <Welcome />;
} else {
    whatToRender = <App />;
}
ReactDOM.render(whatToRender, document.querySelector("main"));
