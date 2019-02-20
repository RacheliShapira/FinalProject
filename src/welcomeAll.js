import React from "react";
import axios from "./axios";
import { HashRouter, Route, Link } from "react-router-dom";

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageurl: "/bookworm.png"
        };
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
            <div id="regForm">
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
                    onChange={this.handleChange}
                />
                <br />
                <br />
                <button onClick={this.submit}>Register</button>
                <br /> <br />
                <p>Already a Bookwormer?</p>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}

export class Login extends React.Component {
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
                    onChange={this.handleChange}
                />
                <br /> <br />
                <button onClick={this.submit}>login</button>
                <br /> <br />
                <p>Still not a Bookwormer?</p>
                <Link to="/">Click here to register!</Link>
            </div>
        );
    }
}

export function Welcome() {
    return (
        <div id="body">
            <div id="welcome">
                <img id="logo" src="/logo.png" />
                <h1> Welcome, littel worms </h1>
                <h2> Join our network and share your reading list</h2>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
