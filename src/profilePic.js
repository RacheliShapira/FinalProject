import React from "react";

export default function ProfilePic(props) {
    let defaultPic = "/bookworm.jpg";
    let url;

    if (props.imageurl == null) {
        url = defaultPic;
        // console.log("image is null: ", props.imageurl);
    } else {
        url = props.imageurl;
        // console.log("image NOT null: ", props.imageurl);
    }
    return (
        <div id="proPicContainer" onClick={props.showUploader}>
            <img id="proPic" src={url} />
        </div>
    );
}
