import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./redux/UserSlices/userSlice";
import blogReducer from "./redux/BlogSlices/blogSlice";

const rootReducer = combineReducers({
  userInfo: userReducer,
  blogs: blogReducer,
});

const userInfo = localStorage.getItem("userInfo");

export default configureStore({
  reducer: rootReducer,
  preloadedState: {
    userInfo: {
      data: userInfo ? JSON.parse(userInfo) : null,
    },
  },
});
