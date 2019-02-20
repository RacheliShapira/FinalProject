import React from "react";
import ProfilePic from "./profilePic";

export default function Header(props) {
    return (
        <div id="header">
            <p id="welcomeP">Welcome to UrbanQuest, {props.first}!</p>

            <ProfilePic
                imageurl={props.imageurl}
                showUploader={props.showUploader}
            />
        </div>
    );
}
