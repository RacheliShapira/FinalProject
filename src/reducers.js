export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABEES") {
        const state = { ...state, friendsList: action.list };
        return state;
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        return {
            ...state,
            friendsList: state.friendsList.map(i => {
                console.log("i in reducer", i);
                if (i.id == action.id) {
                    return { ...i, accepted: true };
                } else {
                    return i;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        return {
            ...state,
            friendsList: state.friendsList.filter(i => {
                if (i.id == action.id) {
                    return false;
                } else {
                    return true;
                }
            })
        };
    }
    if (action.type == "RECEIVE_QUESTS") {
        const state = { ...state, questsList: action.list };
        return state;
    }

    return state;
}
