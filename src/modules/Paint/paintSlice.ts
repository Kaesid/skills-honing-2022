import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { DefaultColors } from "./SideMenu/ColorPicker/constants";
import { IColorsName, IColorsPalette } from "./SideMenu/ColorPicker/interfaces";
import { ToolNames } from "./SideMenu/constants";

interface IPaintState {
  toolName: string;
  colorsPalette: IColorsPalette;
}

const initialState: IPaintState = {
  toolName: ToolNames.PENCIL,
  colorsPalette: DefaultColors,
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

    setColorPalette: (state, action: PayloadAction<IColorsPalette>) => {
      state.colorsPalette = action.payload;
    },

    // setCursor: state => {
    //   state.status = "loading";
    // },
  },
});
// export const getPaintColor = (state: RootState) => state.paint.color;
export const getPaintToolName = (state: RootState) => state.paint.toolName;
export const getColorPalette = (state: RootState) => state.paint.colorsPalette;
export const { setColorPalette, setPaintToolName } = paintSlice.actions;

export default paintSlice.reducer;
