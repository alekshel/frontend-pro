import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice.js";
import {sagaMiddleware} from "./middlewares.js";
import {rootSaga} from "../saga/rootSaga.js";


export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
