import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface IInitialState {
    field: string;
}

const initialState: IInitialState = {
    field: '',
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setField(state, action: PayloadAction<string>){
            state.field = action.payload
        },
        clearField(state){
            state.field = ''
        },
    },
  });

export default searchSlice.reducer;