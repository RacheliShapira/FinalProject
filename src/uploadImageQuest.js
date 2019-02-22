import React from "react";
import axios from "./axios";
// import ProfilePic from "./profilePic";

export default class UploadImageQuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { boardId: this.props.id };
        this.uploadFile = this.uploadFile.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showFilename = this.showFilename.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    uploadFile(e) {
        e.preventDefault();

        var file = document.getElementById("file");
        var uploadedFile = file.files[0];
        var formData = new FormData();
        formData.append("boardId", this.state.boardId);
        formData.append("uploadedFile", uploadedFile);
        formData.append("description", this.description);
        formData.append("location", this.location);

        axios
            .post("/quest/upload", formData)
            .then(response => {
                console.log("response: ", response);
                this.props.addImage(response.data);
            })
            .catch(error => {
                console.log("error in uploader: ", error);
            });
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
        // console.log(" e.target.value;", e.target.value);
    }
    closeModal(e) {
        if (e.target == document.getElementById("uploader")) {
            this.props.hideUploader();
        } else {
            return;
        }
    }
    showFilename() {
        console.log(
            "showfilename!!!!",
            document.getElementById("file").files[0].name
        );
        this.setState({
            filename: document.getElementById("file").files[0].name
        });
    }
    render() {
        return (
            <div onClick={this.closeModal} id="questImageUploader">
                <div id="imageForm">
                    <h3 className="changePic">
                        Choose a picture for your Quest
                    </h3>
                    {this.state.error && (
                        <div className="error">Ooops! something is wrong</div>
                    )}

                    <input
                        name="imageurl"
                        id="file"
                        type="file"
                        onChange={this.showFilename}
                    />

                    <p>Description </p>
                    <input
                        name="description"
                        placeholder="description"
                        onChange={this.handleChange}
                    />
                    <p>location</p>
                    <input
                        name="location"
                        placeholder="location"
                        onChange={this.handleChange}
                    />
                </div>

                <div id="previewpic">
                    <img stc={this.state.filename} />
                </div>

                <button className="uploadButtons" onClick={this.uploadFile}>
                    Upload
                </button>
                <button
                    className="uploadButtons"
                    onClick={this.props.hideUploader}
                >
                    Close
                </button>
            </div>
        );
    }
}
