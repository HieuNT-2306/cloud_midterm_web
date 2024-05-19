import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "63701cc1f03239d40b000046",
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {   
        },
    },
})

export const { setMode, go } = globalSlice.actions;

export default globalSlice.reducer;