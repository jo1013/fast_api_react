// Action Types
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAIL = 'USER_SIGNUP_FAIL';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

// Action Creators
export const userSignupRequest = (userData) => ({
    type: USER_SIGNUP_REQUEST,
    payload: userData,
});

export const userSignupSuccess = (user) => ({
    type: USER_SIGNUP_SUCCESS,
    payload: user,
});

export const userSignupFail = (error) => ({
    type: USER_SIGNUP_FAIL,
    payload: error,
});

export const userLoginRequest = (credentials) => ({
    type: USER_LOGIN_REQUEST,
    payload: credentials,
});

export const userLoginSuccess = (user) => ({
    type: USER_LOGIN_SUCCESS,
    payload: user,
});

export const userLoginFail = (error) => ({
    type: USER_LOGIN_FAIL,
    payload: error,
});
