import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioDraft: ""
        };

        this.editBio = this.editBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ bioDraft: e.target.value });
    }

    editBio() {
        var self = this;
        this.props.hideBioEditor();

        console.log("going to post");

        axios
            .post("updatebioo", { bioDraft: self.state.bioDraft })
            .then(results => {
                self.props.updateProfileBio(results.data);
            })
            .catch(err => {
                console.log(" error while updating bio: ", err);
                console.log("data in bioDraft", this.state.bioDraft);
            });
    }

    render() {
        return (
            <div>
                <textarea
                    id="bioEditor"
                    placeholder={this.bio}
                    onChange={this.handleChange}
                />
                <button id="submitBio" onClick={this.editBio}>
                    Submit
                </button>
            </div>
        );
    }
}
