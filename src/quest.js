import React from "react";
import axios from "./axios";
import UploadImageQuest from "./uploadImageQuest";
import LargeImg from "./largeImg";

import { Link } from "react-router-dom";

export default class Quest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uploaderIsVisible: false, images: [] };
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.addImage = this.addImage.bind(this);
        this.getImages = this.getImages.bind(this);
    }
    componentDidMount() {
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
        this.getImages();
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

    getImages() {
        let self = this;
        let id = this.props.match.params.id;

        axios
            .get("/getQuestImages/" + id)
            .then(results => {
                self.images = results.data;
                console.log(" this.images", this.images);
                console.log(" results.data.rows", results.data.rows);
                // console.log("11this.images.rowCount", this.images.rowCount);
                // console.log(
                //     "results.data.rows.length",
                //     results.data.rows.length
                // );

                self.setState({
                    imageCount: results.data.rows.length,
                    img: results.data.rows
                });
                // console.log("11this.state.imageCount", this.state.imageCount);
            })
            .catch(err => {
                console.log("getQuestInfo: ", err);
            });
        // console.log("22this.state.imageCount", this.state.imageCount);
    }

    render() {
        // console.log("@img", this.state.img);
        return (
            <div>
                <div id="questBoardbg">
                    <img id="bgImage" src="/frame2.png" />
                </div>
                <div id="questInfo">
                    <h2>Quest Name: {this.state.board_name}</h2>
                    <h4>Quest description:{this.state.description}</h4>
                    <p>Visible to: {this.state.type}</p>
                    <img src={this.state.board_img} />
                </div>

                {this.state.imageCount &&
                    this.state.img.map(i => {
                        return (
                            <div key={i.id} className="wannabeItem">
                                <div id="wannabeItemPicture">
                                    {
                                        <Link
                                            to={`/largeImg/${i.id}`}
                                            key={i.id}
                                        >
                                            <img
                                                className="userImag"
                                                src={i.imageurl}
                                            />
                                        </Link>
                                    }
                                </div>
                                <div className="wannabeName">
                                    <h4>
                                        {i.description} {i.location}
                                    </h4>
                                </div>
                            </div>
                        );
                    })}

                <div className="wannabeItem" onClick={this.showUploader}>
                    <div id="wannabeItemPicture">
                        <img className="userImag" src="/addImg.png" />
                    </div>
                    <div className="wannabeName">
                        <h4>Click to upload a new image</h4>
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <UploadImageQuest
                        showUploader={this.showUploader}
                        hideUploader={this.hideUploader}
                        id={this.props.match.params.id}
                        addImage={this.addImage}
                    />
                )}
            </div>
        );
    }
}
