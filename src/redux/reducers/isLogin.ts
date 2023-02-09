import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'isLogin',
    initialState: {
        status: false
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setStatus } = slice.actions;
export default slice.reducer;