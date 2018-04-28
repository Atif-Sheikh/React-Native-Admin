import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    error: '',
    posts: [],
    postsKeys: [],
    users: [],
    usersKeys: [],
    ngos: [],
    ngoKeys: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SIGNINERROR:
            return ({
                ...state,
                error: action.payload
            });
        case ActionTypes.POSTS:
            return ({
                ...state,
                posts: action.payload,
            });
        case ActionTypes.NGO:
            return ({
                ...state,
                ngos: action.payload,
            });
        case ActionTypes.NGOKEYS:
            return ({
                ...state,
                ngoKeys: action.payload,
            });
        case ActionTypes.POSTSKEYS:
            return ({
                ...state,
                postsKeys: action.payload,
            });
        case ActionTypes.USERS:
            return ({
                ...state,
                users: action.payload,
            });
        case ActionTypes.USERSKEYS:
            return ({
                ...state,
                usersKeys: action.payload,
            });
        default:
            return state;
    }
};