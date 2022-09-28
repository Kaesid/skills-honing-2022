import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface IPaintState {
  cursor: string;
  color: string;
}

const initialState: IPaintState = {
  cursor: "",
  color: "#aabbcc",
};

export const paintSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    setPaintColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },

    setCursor: (state, action: PayloadAction<string>) => {
      state.cursor = action.payload;
    },

    // setCursor: state => {
    //   state.status = "loading";
    // },
  },
});
export const getPaintColor = (state: RootState) => state.paint.color;
export const getCursor = (state: RootState) => state.paint.cursor;
export const { setPaintColor, setCursor } = paintSlice.actions;

export default paintSlice.reducer;
