import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchUserSuccess = response => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user: response.data
  }
}

export const fetchUserFail = error => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: true
  }
}

export const fetchUserLoading = () => {
  return {
    type: actionTypes.FETCH_USER_LOADING
  }
}

export const fetchUser = () => {
  return dispatch => {
		axios.get('/api/current_user')
		.then(response => {
			console.log(response);
			dispatch(fetchUserSuccess(response))
		})
		.catch(err => {
			dispatch(fetchUserFail(err));
		})
	}
}

export const regLoading = () => {
  return {
    type: actionTypes.REG_LOADING
  }
}

export const storeSignUpData = data => {
    return dispatch => {
		axios.post('/api/sign_up', data)
		.then(response => {
			console.log(response);
			dispatch(signUpUserSuccess(response))
		})
		.catch(err => {
			dispatch(signUpUserFail(err.response));
		})
	}
}

export const signUpUserSuccess = result => {
    return {
      type: actionTypes.SIGN_UP_USER_SUCCESS,
      user: result
    }
}

export const signUpUserFail = error => {
    return {
      type: actionTypes.SIGN_UP_USER_FAIL,
      error: error
    }
}

export const loginUserSuccess = response => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    user: response.data.user
  }
}

export const loginUserFail = error => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    error: error
  }
}


export const loginUser = loginData => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGIN_LOADING
    })
		axios.post('/api/login', loginData)
		.then(response => {
			console.log(response);
			dispatch(loginUserSuccess(response))
		})
		.catch(err => {
      console.log(err)
			dispatch(loginUserFail(err.response));
		})
	}
}
  
