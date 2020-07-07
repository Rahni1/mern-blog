import axios from "axios";
import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
  RESET_POST,
} from "./types";

import { setErrors, clearErrors } from "./errorActions";
import { toggleUserLoading } from "./authActions";

// accepts postData & history as params
export const createPost = (postData, history) => (dispatch) => {
  dispatch(togglePostLoading());
  // create API call to create a new post
  axios
    .post(`${API}/posts/create`, postData)
    // if post is created, get post response back
    .then((res) => {
      // dispatch action to add this post to user’s current posts
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
      dispatch(togglePostLoading());
      // After post is created, user is redirected to dashboard
      history.push("/blog");
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostLoading());
    });
};

// 3 different API requests for fetching the post

// fetches individual post
export const getPostById = (id) => (dispatch) => {
  dispatch(togglePostLoading());
  axios
    .get(`${API}/posts/post/${id}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch(togglePostLoading());
    })

    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostLoading());
    });
};

// fetches all posts from particular author
export const getPostsByAuthor = (author) => (dispatch) => {
  dispatch(togglePostsLoading());
  axios
    .get(`${API}/posts/author/${author}`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
      dispatch(togglePostsLoading());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostsLoading());
    });
};

// fetches posts when user is logged in
export const getPosts = () => (dispatch) => {
  dispatch(togglePostsLoading());
  axios.get(`${API}/posts/`).then((res) => {
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    dispatch(clearErrors());
    dispatch(togglePostsLoading());
  });
};

// updates post
export const updatePost = (id, postData, history) => (dispatch) => {
  dispatch(togglePostLoading());
  axios.patch(`${API}/posts/update/${id}`, postData).then((res) => {
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    dispatch(togglePostLoading());
  });
};

// deletes post
export const deletePost = (id, history) => (dispatch) => {
  dispatch(togglePostLoading());
  axios
    .delete(`${API}/posts/delete/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(togglePostLoading());
      history.push("/blog");
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostLoading());
    });
};

export const resetPost = () => {
  return {
    type: RESET_POST,
  };
};

export const togglePostLoading = () => {
  return {
    type: TOGGLE_POST_LOADING,
  };
};

export const togglePostsLoading = () => {
  return {
    type: TOGGLE_POSTS_LOADING,
  };
};
