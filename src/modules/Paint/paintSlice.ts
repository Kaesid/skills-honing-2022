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

    setPaintCursor: (state, action: PayloadAction<string>) => {
      state.cursor = action.payload;
    },

    // setCursor: state => {
    //   state.status = "loading";
    // },
  },
});
export const getPaintColor = (state: RootState) => state.paint.color;
export const getPaintCursor = (state: RootState) => state.paint.cursor;
export const { setPaintColor, setPaintCursor } = paintSlice.actions;

export default paintSlice.reducer;