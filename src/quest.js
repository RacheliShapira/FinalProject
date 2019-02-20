import React from "react";

export default class Quest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("!!!this.board_name:", this.board_name);
        console.log("!!!this.state.board_name:", this.state.board_name);

        return (
            <div id="wwwwwww">
                <h2>PPPP</h2>
                <h1>{this.board_name}</h1>
                <h1> description: {this.description}</h1>
            </div>
        );
    }
}
