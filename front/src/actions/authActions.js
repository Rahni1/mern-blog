import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { API } from '../config';

import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from './types'
import { resetPost } from './postActions'
import { setErrors } from './errorActions'

// User signup action
// accept userData and history as params
export const registerUser = (userData, history) => dispatch => {
    dispatch(toggleUserLoading())
    // make API call to register user sending userData
    axios
    .post(`${API}/users/signup`, userData)
    // if auth is successful, set message
    // & redirect user to signin page
    .then(res => {
        dispatch(toggleUserLoading())
        localStorage.setItem(
            "signinMessage",
            "Successfully registered. Signin to continue"
        )
        history.push("/signin")
    })
    .catch(err => {
        dispatch(setErrors(err.response.data))
        // disables button & shows loading progress bar until response received from server
        dispatch(toggleUserLoading())
    })
}
//  accepts userData as param
export const signinUser = userData => dispatch => {
dispatch(toggleUserLoading())
// make API call to signin, sending user data
axios
.post(`${API}/users/signin`, userData)
// if auth is successful, I receive jwt-token
.then(res => {
    dispatch(resetPost())
    const { token } = res.data
// & store it in localStorage so it stays there until removed on user sign out/token expires
 localStorage.setItem("jwtToken", token)
 // set authToken so any further API request will have token in its header
 setAuthToken(token)
 // decode token & set current user (id, username) 
// & reset posts before loading the new users session.
 const decoded = jwt_decode(token)
 // dispatch setCurrentUser twice, once when user logs in sending userData
 dispatch(setCurrentUser(decoded))
 dispatch(toggleUserLoading())
})
}

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}

export const toggleUserLoading = () => {
return {
    type: TOGGLE_USER_LOADING
}
}

export const signoutUser = () => dispatch => {
localStorage.removeItem("jwtToken")
setAuthToken(false)
// 2. dispatch setCurrentUser sending empty object
dispatch(setCurrentUser({}))
}