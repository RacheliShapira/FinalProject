import React from "react";
import axios from "./axios";

export default class addQuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board_img: "/defaultBoard.jpg",
            fromSubmitted: false
            // board_id: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    submit() {
        // console.log("board_name", this.board_name);

        axios
            .post("/addQuest", {
                board_name: this.board_name,
                board_img: this.state.board_img,
                description: this.description,
                type: this.type
            })
            .then(response => {
                this.setState({
                    board_id: response.data.board_id,
                    submittedForm: true
                });
                // console.log("this.state.board_id", this.state.board_id);
                this.props.history.push(`/quest/${this.state.board_id}`);
            })
            .catch(error => {
                console.log("error in uploader: ", error);
            });
    }

    render() {
        return (
            <div id="addQuest">
                <div>
                    <h2>
                        Add a new Quest board, to upload pictures and share with
                        your friends!
                    </h2>
                </div>
                <div id="boardForm">
                    {this.state.error && (
                        <div className="error">Ooops! something is wrong</div>
                    )}
                    <p>Quest title: </p>
                    <input name="board_name" onChange={this.handleChange} />
                    <p>Quest photo: </p>
                    <img id="boardPic" src={this.state.board_img} />
                    <p>description: </p>
                    <input name="description" onChange={this.handleChange} />

                    <form onChange={this.handleChange}>
                        <p>Choose who can see and add to this Quest board</p>
                        <input
                            type="radio"
                            name="type"
                            value="Private"
                            onChange={this.handleChange}
                        />
                        Private
                        <input
                            type="radio"
                            name="type"
                            value="Friends"
                            onChange={this.handleChange}
                        />
                        Friends
                        <input
                            type="radio"
                            name="type"
                            value="Public"
                            onChange={this.handleChange}
                        />
                        Public
                    </form>
                    <br />
                    <button onClick={this.submit}>New Quest</button>
                </div>
            </div>
        );
    }
}
