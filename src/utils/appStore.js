import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // make sure the path is correct

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
