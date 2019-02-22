import React from "react";

export default function Nav() {
    return (
        <div id="nav">
            <a className="navButtons" href="myQuests">
                My Quests
            </a>
            <br />
            <a className="navButtons" href="/addQuest">
                Create a New Quest Board
            </a>
            <br />
            <a className="navButtons" href="/myFriends">
                My Friends
            </a>
            <br />
            <a className="navButtons" href="/search">
                Search Friends
            </a>
            <br />

            <a className="navButtons" href="/logout">
                Log Out
            </a>
        </div>
    );
}
