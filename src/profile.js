import React from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile(props) {
    return (
        <div id="proileContainer">
            <div id="proPicProfile" onClick={props.showUploader}>
                <ProfilePic
                    imageurl={props.imageurl}
                    showUploader={props.showUploader}
                />
            </div>
            <div id="profileName">
                <h1>
                    {props.first} {props.last}
                </h1>
            </div>
            <div id="bioEditorContainer">
                <p id="status">{props.bio}</p>
                <button className="bioButtons" onClick={props.showBioEditor}>
                    Status
                </button>
                {props.bioEditorVisible && (
                    <BioEditor
                        hideBioEditor={props.hideBioEditor}
                        bio={props.bio}
                        updateProfileBio={props.updateProfileBio}
                    />
                )}
            </div>
            <div id="profileInfo">
                <h3> Your Friends:</h3>
                <h3> Your Quest boards:</h3>
            </div>
        </div>
    );
}
