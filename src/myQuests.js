import React from "react";
import { myQuests } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AddQuest from "./addQuest";

class MyQuests extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(myQuests());
    }
    render() {
        console.log("this.props.myQuests", this.props.myQuests);
        if (!this.props.myQuests) {
            return (
                <div>
                    <p id="noQuest">
                        **You have no quests, start a new Quest!**
                    </p>
                    <AddQuest />
                </div>
            );
        }

        return (
            <div id="wannabeContainer">
                {this.props.myQuests.length > 0 && (
                    <h2 className="friendshipTitle">my Quests:</h2>
                )}

                {this.props.myQuests &&
                    this.props.myQuests.map(i => {
                        return (
                            <div key={i.id} className="wannabeItem">
                                <div id="wannabeItemPicture">
                                    {
                                        <Link to={`/quests/${i.id}`} key={i.id}>
                                            <img
                                                className="userImag"
                                                src={i.board_img}
                                            />
                                        </Link>
                                    }
                                </div>
                                <div className="wannabeName">
                                    <h4>
                                        {i.board_name} {i.description}
                                        {i.type}
                                    </h4>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

//this function will run everytime the redux state is updated
const mapStateToProps = function(state) {
    if (!state.myQuests) {
        return {};
    } else {
        return {
            myQuests: state.myQuests
        };
    }
};
export default connect(mapStateToProps)(MyQuests);
