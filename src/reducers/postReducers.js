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
  LIST_SEARCH_POSTS_REQUEST,
  LIST_SEARCH_POSTS_SUCCESS,
  LIST_SEARCH_POSTS_FAIL,
} from '../Constants/postConstants';

export const listMyPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case LIST_MY_POSTS_REQUEST:
      return { loading: true };
    case LIST_MY_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case LIST_MY_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listLatestPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case LIST_LATEST_POSTS_REQUEST:
      return { loading: true };
    case LIST_LATEST_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case LIST_LATEST_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listPostByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_POST_BY_ID_REQUEST:
      return { loading: true };
    case LIST_POST_BY_ID_SUCCESS:
      return { loading: false, post: action.payload };
    case LIST_POST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listUserPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case LIST_USER_POSTS_REQUEST:
      return { loading: true };
    case LIST_USER_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case LIST_USER_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createNewPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePostReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { loading: true };
    case UPDATE_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case UPDATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
