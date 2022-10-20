import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { DefaultColors } from "./constants";
import { IColorsPalette } from "./interface";
import { ToolNames } from "./SideMenu/constants";

interface IPaintState {
  toolName: ToolNames;
  colorsPalette: IColorsPalette;
  canvasState: ImageData | null;
}

const initialState: IPaintState = {
  toolName: ToolNames.PENCIL,
  colorsPalette: DefaultColors,
  canvasState: null,
};

export const paintSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    setCanvasState: (state, action: PayloadAction<ImageData | null>) => {
      state.canvasState = action.payload;
    },

    setPaintToolName: (state, action: PayloadAction<ToolNames>) => {
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
export const getPaintState = (state: RootState) => state.paint;
export const { setColorPalette, setPaintToolName, setCanvasState } = paintSlice.actions;

export default paintSlice.reducer;
