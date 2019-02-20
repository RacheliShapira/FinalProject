import React from "react";

export default function ProfilePic(props) {
    let url = props.imageurl;

    return (
        <div id="proPicContainer" onClick={props.showUploader}>
            <img id="proPic" src={url} />
        </div>
    );
}
