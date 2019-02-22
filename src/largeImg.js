import React from "react";
import axios from "./axios";

export default class LargeImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uploaderIsVisible: false, images: [] };
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.addImage = this.addImage.bind(this);
        this.getImages = this.getImages.bind(this);
    }
    componentDidMount() {
        // let self = this;
        // let id = this.props.match.params.id;
        // axios
        //     .get("/getQuestInfo/" + id)
        //     .then(results => {
        //         self.setState({
        //             id: results.data.rows[0].id,
        //             board_name: results.data.rows[0].board_name,
        //             board_img: results.data.rows[0].board_img,
        //             description: results.data.rows[0].description,
        //             type: results.data.rows[0].type
        //         });
        //     })
        //     .catch(err => {
        //         console.log("getQuestInfo: ", err);
        //     });
        // this.getImages();
    }

    render() {
        // console.log("@img", this.state.img);
        console.log("sdsad");
        return (
            <div id="largeImgContainer">
                <p>!!!!jkljeklafhadjksfkjadsf</p>
            </div>
        );
    }
}
//
//
// <div id="wannabeItemPicture">
//     <img className="userImag" src={i.imageurl} />
// </div>
// <div className="wannabeName">
//     <h4>
//         {i.description} {i.location}
//     </h4>
// </div>
