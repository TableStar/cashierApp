import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountReducer";
import { basketReducer } from "./basketReducer";

const globalState = configureStore({
  reducer: { accountReducer, basketReducer }
});

export default globalState;
