import React from "react";
import axios from "./axios";

export default class LargeImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        let self = this;
        let id = this.props.match.params.id;
        axios
            .get("/getImageInfo/" + id)
            .then(results => {
                self.setState({
                    id: results.data.rows[0].id,
                    board_id: results.data.rows[0].board_id,
                    uploader_id: results.data.rows[0].uploader_id,
                    imageurl: results.data.rows[0].imageurl,
                    description: results.data.rows[0].description,
                    location: results.data.rows[0].location,
                    created_at: results.data.rows[0].created_at
                });
                this.checkUploader(self.state.uploader_id);
            })
            .catch(err => {
                console.log("getImageInfo: ", err);
            });
    }

    checkUploader(uploader) {
        // let uploader = this.uploader_id;

        axios
            .get("/getUploaderName/" + uploader)
            .then(response => {
                // console.log("response", response);
                self.setState({
                    first: response.data.rows[0].first,
                    last: response.data.rows[0].last,
                    imageurl: response.data.rows[0].imageurl
                });
            })
            .catch(err => {
                console.log("getUploaderName: ", err);
            });
    }

    closeModal(e) {
        if (e.target == document.getElementById("uploader")) {
            this.props.hideUploader();
        } else {
            return;
        }
    }

    render() {
        return (
            <div onClick={this.closeModal} id="imgContainer">
                <div id="largeImg">
                    <img id="modal_img" src={this.state.imageurl} />
                </div>
                <div id="imgInfo">
                    <h4>Image Description:</h4> <p>{this.state.description}</p>
                    <h4>Image location:</h4>
                    <p> {this.state.location}</p>
                    <br />
                    <h4>Image created at:</h4> <p>{this.state.created_at}</p>
                    <br />
                    <button
                        className="uploadButtons"
                        onClick={this.props.hideUploader}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
}
