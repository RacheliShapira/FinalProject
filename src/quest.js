import React from "react";
import axios from "./axios";
import UploadImageQuest from "./uploadImageQuest";

export default class Quest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uploaderIsVisible: false };
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.addImage = this.addImage.bind(this);
    }
    componentDidMount() {
        console.log("this.showUploader", this.state.uploaderVisible);

        let self = this;
        let id = this.props.match.params.id;
        axios
            .get("/getQuestInfo/" + id)
            .then(results => {
                self.setState({
                    id: results.data.rows[0].id,
                    board_name: results.data.rows[0].board_name,
                    board_img: results.data.rows[0].board_img,
                    description: results.data.rows[0].description,
                    type: results.data.rows[0].type
                });
            })
            .catch(err => {
                console.log("getQuestInfo: ", err);
            });
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    hideUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    addImage(url) {
        this.setState({
            imageurl: url,
            uploaderIsVisible: false
        });
    }
    // getImages() {
    //     let self = this;
    //     let id = this.props.match.params.id;
    //     let pics = [];
    //     axios
    //         .get("/getQuestImages/" + id)
    //         .then(results => {
    //             for (var i = 0; i++; i < data.rows.length) {
    //                 self.setState({
    //                     id: results.data.rows[0].id,
    //                     uploader_id: results.data.rows[0].uploader_id,
    //                     imageurl: results.data.rows[0].imageurl,
    //                     description: results.data.rows[0].description,
    //                     location: results.data.rows[0].location
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             console.log("getQuestInfo: ", err);
    //         });
    // }

    render() {
        return (
            <div>
                <div id="questInfo">
                    <h2>{this.state.board_name}</h2>
                    <h3>{this.state.description}</h3>
                    <p>{this.state.type}</p>
                    <img id="proPic" src={this.state.imageurl} />
                </div>
                <div id="imagesContainer">
                    <button onClick={this.showUploader}>Uploade Image</button>
                    {this.state.uploaderIsVisible && (
                        <UploadImageQuest
                            showUploader={this.showUploader}
                            hideUploader={this.hideUploader}
                            id={this.props.match.params.id}
                            addImage={this.addImage}
                        />
                    )}
                </div>
            </div>
        );
    }
}
