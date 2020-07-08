import {
  RESET_POST,
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
} from "../actions/types";

// post reducer handles actions that were dispatched in postActions
const initialState = {
  post: {},
   // load all users posts in array
  posts: [],
  postLoading: false,
  postsLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
    // once new post is created, it is added to user's posts array
        posts: [...state.posts, action.payload],
      };
    case GET_POSTS:
      return {
        ...state,
        post: {},
        posts: [action.payload],
      };
    case GET_POST:
      return {
        ...state,
        // when user requests specific post, add it in post object
        post: { ...action.payload[0] },
      };
    case UPDATE_POST:
        // filter out updated post & push the new post object
      const posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      return {
        ...state,
        post: {},
        posts: [...posts, action.payload],
      };
    case DELETE_POST:
      return {
        ...state,
        // filter out post from user's array
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case TOGGLE_POST_LOADING:
      return {
        ...state,
        postLoading: !state.postLoading,
      };
    case TOGGLE_POSTS_LOADING:
      return {
        ...state,
        postLoading: !state.postsLoading,
      };
    case RESET_POST:
        return initialState
        default:
            return state
  }
}
