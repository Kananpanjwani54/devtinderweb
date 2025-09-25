import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // make sure the path is correct
import feedReducer from "./feedSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
