import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface IInitialState {
  authors: IAuthors[];
  isLoading: boolean;
  error: string;
}

export interface IAuthors {
  id: number;
  name: string;
}

const initialState: IInitialState = {
  authors: [],
  isLoading: false,
  error: "",
};

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    authorsFatching(state) {
      state.isLoading = true;
    },
    authorsFatchingSuccess(state, action: PayloadAction<IAuthors[]>) {
      state.isLoading = false;
      state.error = "";
      state.authors = action.payload;
    },
    authorsFatchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authorsSlice.reducer;
