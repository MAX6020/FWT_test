import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface IInitialState {
  locations: ILocations[];
  isLoading: boolean;
  error: string;
}

export interface ILocations {
  id: number;
  location: string;
}

const initialState: IInitialState = {
  locations: [],
  isLoading: false,
  error: "",
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    locationsFatching(state) {
      state.isLoading = true;
    },
    locationsFatchingSuccess(state, action: PayloadAction<ILocations[]>) {
      state.isLoading = false;
      state.error = "";
      state.locations = action.payload;
    },
    locationsFatchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default locationsSlice.reducer;
