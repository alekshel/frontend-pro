import { configureStore } from "@reduxjs/toolkit";
import {counter} from "./slice/counterSlice.js";

export const store = configureStore({
    reducer: {
        counter: counter.reducer,
    },
})