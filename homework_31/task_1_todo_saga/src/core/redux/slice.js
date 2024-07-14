import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  data: undefined,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      state.data = state.data.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    },
  }
})

export default todoSlice;
