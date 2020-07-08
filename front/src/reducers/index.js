import { combineReducers } from 'redux'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import postReducer from './postReducers'

// combine all reducers
// this is the rootReducer for the app
export default combineReducers({
    auth: authReducer,
    post: postReducer,
    errors: errorReducer
})