import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // make sure the path is correct
import feedReducer from "./feedSlice"
import connectionsReducer from "./ConnectionsSlice"
import requestReducer from "./RequestSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections:connectionsReducer,
    requests:requestReducer,
  },
});

export default appStore;
