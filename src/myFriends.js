import React from "react";
import { receiveFriendsList, acceptFriendRequest, unFriend } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MyFriends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(receiveFriendsList());
    }
    render() {
        if (!this.props.wannabes || !this.props.friends) {
            return null;
        }

        return (
            <div id="friendsList">
                <div id="wannabeContainer">
                    {this.props.wannabes.length > 0 && (
                        <h2 className="friendshipTitle">
                            Pending friend requests:
                        </h2>
                    )}

                    {this.props.wannabes &&
                        this.props.wannabes.map(i => {
                            return (
                                <div key={i.id} className="wannabeItem">
                                    <div id="wannabeItemPicture">
                                        {
                                            <Link
                                                to={`/user/${i.id}`}
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
                                            {i.first} {i.last}
                                        </h4>
                                        <button
                                            className="frienshipButton"
                                            onClick={() =>
                                                this.props.dispatch(
                                                    acceptFriendRequest(i.id)
                                                )
                                            }
                                        >
                                            Accept Friendship
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div>
                    <div id="friendsContainer">
                        {this.props.friends.length > 0 && (
                            <h2 className="friendshipTitle">Your friends:</h2>
                        )}
                        {this.props.friends.length == 0 && (
                            <h4 className="onlineTitle">NO friends</h4>
                        )}
                        {this.props.friends &&
                            this.props.friends.map(i => {
                                return (
                                    <div key={i.id} className="friendItem">
                                        <div id="friendItemPicture">
                                            {
                                                <Link
                                                    to={`/user/${i.id}`}
                                                    key={i.id}
                                                >
                                                    <img
                                                        className="userImag"
                                                        src={i.imageurl}
                                                    />
                                                </Link>
                                            }
                                        </div>
                                        <div className="friendName">
                                            <h4>
                                                {i.first} {i.last}
                                            </h4>
                                            <button
                                                className="frienshipButton"
                                                onClick={() =>
                                                    this.props.dispatch(
                                                        unFriend(i.id)
                                                    )
                                                }
                                            >
                                                End Friendship
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

//this function will run everytime the redux state is updated
const mapStateToProps = function(state) {
    if (!state.friendsList) {
        return {};
    } else {
        return {
            friends: state.friendsList.filter(i => {
                if (i.accepted) {
                    return true;
                } else {
                    return false;
                }
            }),
            wannabes: state.friendsList.filter(i => {
                if (!i.accepted) {
                    return true;
                } else {
                    return false;
                }
            })
        };
    }
};
export default connect(mapStateToProps)(MyFriends);
