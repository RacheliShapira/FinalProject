import React from "react";
import axios from "./axios";
import Header from "./header";
import Uploader from "./uploader";
import Profile from "./profile";
import Nav from "./nav";
import OtherUser from "./otherUser";
import AddQuest from "./addQuest";
import Quest from "./quest";

import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

export default class App extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            uploaderVisible: false,
            bioEditorVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.changePictureUrl = this.changePictureUrl.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.hideBioEditor = this.hideBioEditor.bind(this);
        this.showBioEditor = this.showBioEditor.bind(this);
        this.updateProfileBio = this.updateProfileBio.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(results => {
                this.setState({
                    first: results.data.rows[0].first,
                    last: results.data.rows[0].last,
                    imageurl: results.data.rows[0].imageurl,
                    bio: results.data.rows[0].bio
                });
            })
            .catch(err => {
                console.log("error in mount app: ", err);
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

    changePictureUrl(url) {
        console.log(
            "(changePictureUrl) imageurl : ",
            this.state.imageurl,
            "url : ",
            url
        );
        this.setState({
            imageurl: url,
            uploaderIsVisible: false
        });
    }

    ///////////////////BioEditor

    hideBioEditor() {
        this.setState({
            bioEditorVisible: false
        });
    }
    showBioEditor() {
        this.setState({
            bioEditorVisible: true
        });
    }

    updateProfileBio(bio) {
        console.log("updateBio running!");
        this.setState({
            bio: bio
        });
    }

    render() {
        return (
            <div id="app">
                <div id="appHeader">
                    <Header
                        first={this.state.first}
                        last={this.state.last}
                        imageurl={this.state.imageurl}
                        showUploader={this.showUploader}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            imageurl={this.state.imageurl}
                            changePictureUrl={this.changePictureUrl}
                            showUploader={this.showUploader}
                            hideUploader={this.hideUploader}
                        />
                    )}
                </div>

                <div id="appNav">
                    <Nav />
                </div>
                <BrowserRouter>
                    <div id="appProfile">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageurl={this.state.imageurl}
                                    showUploader={this.showUploader}
                                    hideUploader={this.hideUploader}
                                    bio={this.state.bio}
                                    showBioEditor={this.showBioEditor}
                                    hideBioEditor={this.hideBioEditor}
                                    bioEditorVisible={
                                        this.state.bioEditorVisible
                                    }
                                    updateProfileBio={this.updateProfileBio}
                                />
                            )}
                        />
                        <Route path="/addQuest" component={AddQuest} />

                        <Route
                            path="/quest/:id"
                            render={props => <Quest match={props.match} />}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherUser
                                    first={this.state.first}
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
