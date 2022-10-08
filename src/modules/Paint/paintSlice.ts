import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { ToolNames } from "./SideMenu/constants";

interface IPaintState {
  toolName: string;
}

const initialState: IPaintState = {
  toolName: ToolNames.PENCIL,
};

export const paintSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    // setPaintColor: (state, action: PayloadAction<string>) => {
    //   state.color = action.payload;
    // },

    setPaintToolName: (state, action: PayloadAction<string>) => {
      state.toolName = action.payload;
    },

    // setCursor: state => {
    //   state.status = "loading";
    // },
  },
});
// export const getPaintColor = (state: RootState) => state.paint.color;
export const getPaintToolName = (state: RootState) => state.paint.toolName;
export const {
  //  setPaintColor,
  setPaintToolName,
} = paintSlice.actions;

export default paintSlice.reducer;
