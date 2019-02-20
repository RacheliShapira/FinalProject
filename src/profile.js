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
            <div id="profileInfo">
                <h1>
                    {props.first} {props.last}
                </h1>
                <h3>{props.bio}</h3>
                <p> A few words about {props.first} : </p>
            </div>

            <div id="bioEditorContainer">
                <button className="bioButtons" onClick={props.showBioEditor}>
                    Write something
                </button>
                {props.bioEditorVisible && (
                    <BioEditor
                        hideBioEditor={props.hideBioEditor}
                        bio={props.bio}
                        updateProfileBio={props.updateProfileBio}
                    />
                )}
            </div>
            <h3> Your Quest boards:</h3>
        </div>
    );
}
