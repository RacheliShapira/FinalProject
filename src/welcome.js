import React from "react";

import Registration from "./registration";
import Login from "./login";

export function Welcome() {
    return (
        <div id="welcome">
            <div id="headerW">
                <h1> Welcome to UrbanQuest </h1>
            </div>
            <div id="registration">
                <Registration />
            </div>
            <div id="login">
                <Login />
            </div>
        </div>
    );
}
