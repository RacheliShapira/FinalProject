import React from "react";
import ProfilePic from "./profilePic";

export default function Header(props) {
    return (
        <div id="header">
            <img id="logo" src="/logo.png" />
            <p id="welcomeP">
                Welcome to UrbanQuest, {props.first} {props.last}!
            </p>

            <ProfilePic
                imageurl={props.imageurl}
                showUploader={props.showUploader}
            />
        </div>
    );
}
