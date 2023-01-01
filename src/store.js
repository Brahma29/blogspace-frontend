import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/UserSlices/AuthSlice';
import blogListReducer from './redux/BlogSlices/BlogListSlice';
import blogUpdateReducer from './redux/BlogSlices/BlogUpdateSlice';
import singleBlogReducer from './redux/BlogSlices/SingleBlogSlice';
import commentReducer from './redux/BlogSlices/CommentSlice';
import likePostReducer from './redux/BlogSlices/LikePostSlice';
import UserProfileReducer from './redux/UserSlices/UserProfileSlice';

const rootReducer = combineReducers({
  authUser: authReducer,
  blogList: blogListReducer,
  blogUpdate: blogUpdateReducer,
  singleBlog: singleBlogReducer,
  addComment: commentReducer,
  likePost: likePostReducer,
  userProfile: UserProfileReducer,
});

const token = localStorage.getItem('token');

export default configureStore({
  reducer: rootReducer,
  preloadedState: {
    authUser: {
      isLoggedIn: token ? true : false,
    },
  },
});
