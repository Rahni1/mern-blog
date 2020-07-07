// authReducer handles the actions dispatched in authActions

// it sets the user object if I send a user (or non-empty) object.
// It also toggles user loading.

import { SET_CURRENT_USER, TOGGLE_USER_LOADING, TOGGLE_POSTS_LOADING } from '../actions/types'
const isEmpty = require('is-empty')

const initialState = {
    isAuthenticated: false,
    user: {},
    userLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
            case TOGGLE_USER_LOADING:
                return {
                    ...state,
                    userLoading: !state.userLoading
                }
                default: 
                return state
    }
}