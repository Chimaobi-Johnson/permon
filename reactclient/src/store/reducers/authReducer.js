import * as actionTypes from "../actions/actionTypes";


const initialState = {
  fetchUserLoading: false,
  fetchUserErr: null,
  userData: null,
  signUpSuccess: false,
  signUpErr: null,
  regLoading: false,
  loginErr: null,
  loginLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_LOADING:
      return {
        ...state,
        fetchUserLoading: true,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.user,
        fetchUserErr: null,
        fetchUserLoading: false,
      };
    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        userData: null,
        fetchUserErr: action.error,
        fetchUserLoading: false,
      };
    case actionTypes.REG_LOADING:
      return {
        ...state,
        regLoading: true,
      };
    case actionTypes.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        signUpSuccess: true,
        regLoading: false,
        signUpErr: null,
      };
    case actionTypes.SIGN_UP_USER_FAIL:
      return {
        ...state,
        signUpSuccess: false,
        regLoading: false,
        signUpErr: action.error,
      };
    case actionTypes.LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: action.user,
        loginErr: null,
        loginLoading: false,
      };
    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        userData: null,
        loginErr: action.error,
        loginLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
