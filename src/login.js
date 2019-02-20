import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post("/welcome/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                if (data.success) {
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
            <div id="loginForm">
                <h2> Login to your account</h2>
                {this.state.error && (
                    <div className="error">Ooops, something is wrong!</div>
                )}
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
                <button onClick={this.submit}>login</button>
            </div>
        );
    }
}
