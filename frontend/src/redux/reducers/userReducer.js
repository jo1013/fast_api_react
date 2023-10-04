import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../actions/userActions';

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_SIGNUP_SUCCESS:
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
            };
        case USER_SIGNUP_FAIL:
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
