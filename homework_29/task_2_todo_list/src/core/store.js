import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice.js";

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    }
})
