import React from "react";

export default function Nav() {
    return (
        <div id="nav">
            <a className="navButtons" href="/">
                Profile
            </a>
            <br />
            <a className="navButtons" href="/search">
                Search Friends
            </a>
            <br />
            <a className="navButtons" href="/addQuest">
                Create a New Quest Board
            </a>
            <br />
            <a className="navButtons" href="/chatmessages">
                Chat
            </a>
            <br />
            <a className="navButtons" href="/logout">
                Log Out
            </a>
        </div>
    );
}
