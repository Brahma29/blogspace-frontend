import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  listMyPostsReducer,
  listLatestPostsReducer,
  listPostByIdReducer,
  listUserPostsReducer,
  createNewPostReducer,
  updatePostReducer,
  deletePostReducer,
  searchPostReducer,
} from '../src/reducers/postReducers';
import {
  userRegisterReducer,
  userLoginReducer,
  userUpdateReducer,
} from '../src/reducers/userReducers';

const reducer = combineReducers({
  postsList: listMyPostsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  latestPosts: listLatestPostsReducer,
  listPostById: listPostByIdReducer,
  updateUser: userUpdateReducer,
  userPosts: listUserPostsReducer,
  createNewPost: createNewPostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,
});
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
