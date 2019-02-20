import React from "react";

export default function Nav() {
    return (
        <div id="nav">
            <a className="navButtons" href="/">
                Profile
            </a>
            <br />
            <a className="navButtons" href="/friends">
                Friends
            </a>
            <br />
            <a className="navButtons" href="/onlineusers">
                Who is online
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
