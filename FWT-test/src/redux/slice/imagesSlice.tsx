import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface IInitialState {
  images: IImages[];
  totalCount: number;
  isLoading: boolean;
  error: string;
}
export interface IImages {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

const initialState: IInitialState = {
  images: [],
  totalCount: 0,
  isLoading: false,
  error: "",
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    imagesFatching(state) {
      state.isLoading = true;
    },
    imagesFatchingSuccess(state, action: PayloadAction<IImages[]>) {
      state.isLoading = false;
      state.error = "";
      state.images = action.payload;
    },
    imagesFatchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    countFatching(state, action: PayloadAction<number>){
      state.totalCount = action.payload
    }
  },
});

export default imagesSlice.reducer;
