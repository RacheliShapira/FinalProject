import axios from "./axios";

export function receiveFriendsList() {
    return axios.get("/friends/list").then(results => {
        // console.log("receiveFriendsList: results.data.rows", results.data.rows);
        return {
            type: "RECEIVE_FRIENDS_WANNABEES",
            list: results.data.rows
        };
    });
}

export function acceptFriendRequest(wannabe_id) {
    return axios.post("/acceptFriendship/" + wannabe_id).then(() => {
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id: wannabe_id
        };
    });
}

export function unFriend(friend_id) {
    return axios
        .post("/removeFriendship/" + friend_id, { action: "UNFRIEND" })
        .then(() => {
            return {
                type: "UNFRIEND",
                id: friend_id
            };
        });
}
////////////////////////////////////
export function myQuests() {
    return axios.get("/getMyQuests").then(results => {
        // console.log("myQuests: results.data.rows", results.data.rows);

        return {
            type: "RECEIVE_QUESTS",
            list: results.data.rows
        };
    });
}
