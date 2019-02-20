import React from "react";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageurl: "/default.png" };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post("/welcome/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
                // imageurl: this.state.imageurl
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log("success", this.email);
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div id="regForm">
                <h2> Resigter to UrbanQuest</h2>
                {this.state.error && (
                    <div className="error">Ooops! something is wrong</div>
                )}
                <p>First Name: </p>
                <input
                    name="first"
                    placeholder="first name"
                    onChange={this.handleChange}
                />
                <p>Last Name: </p>
                <input
                    name="last"
                    placeholder="last name"
                    onChange={this.handleChange}
                />
                <p>email: </p>
                <input
                    name="email"
                    placeholder="email"
                    onChange={this.handleChange}
                />
                <p>pasword: </p>
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={this.handleChange}
                />
                <br /> <br />
                <button onClick={this.submit}>Register</button>
            </div>
        );
    }
}
