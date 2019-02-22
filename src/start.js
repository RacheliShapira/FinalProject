import React from "react";
import ReactDOM from "react-dom";

import { Welcome } from "./welcome";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let whatToRender;
if (location.pathname == "/welcome") {
    whatToRender = <Welcome />;
} else {
    whatToRender = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
ReactDOM.render(whatToRender, document.querySelector("main"));
