import {
  LIST_MY_POSTS_REQUEST,
  LIST_MY_POSTS_SUCCESS,
  LIST_MY_POSTS_FAIL,
  LIST_LATEST_POSTS_REQUEST,
  LIST_LATEST_POSTS_SUCCESS,
  LIST_LATEST_POSTS_FAIL,
  LIST_POST_BY_ID_REQUEST,
  LIST_POST_BY_ID_SUCCESS,
  LIST_POST_BY_ID_FAIL,
  LIST_USER_POSTS_REQUEST,
  LIST_USER_POSTS_SUCCESS,
  LIST_USER_POSTS_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
} from '../Constants/postConstants';
import axios from 'axios';

// getPostsByKeyword

export const listPosts = (searchType, keyword) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MY_POSTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/posts?searchType=${searchType}&keyword=${keyword}`
    );

    dispatch({
      type: LIST_MY_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_MY_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_LATEST_POSTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/posts/topposts`
    );

    dispatch({
      type: LIST_LATEST_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_LATEST_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_POST_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);

    dispatch({
      type: LIST_POST_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserPosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_USER_POSTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/posts?user=${username}`
    );

    dispatch({
      type: LIST_USER_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_USER_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    });

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/posts/newpost',
      formdata,
      config
    );

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserPost = (pid, formdata) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_POST_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/posts/${pid}`,
      formdata,
      config
    );

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePostById = (pid, username) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/posts/${pid}`,
      { data: { username } },
      config
    );

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
