import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { DefaultColors } from "./constants";
import { ICanvasStates, IColorsName, IColorsPalette } from "./interface";
import { ToolNames } from "./SideMenu/constants";

interface IPaintState {
  toolName: ToolNames;
  colorsPalette: IColorsPalette;
  // canvasState: ImageData | null;
  canvasStates: ICanvasStates;
  // canvasStates: string;
  selectedColorSlot: IColorsName;
}

const initialState: IPaintState = {
  toolName: ToolNames.PENCIL,
  colorsPalette: DefaultColors,
  // canvasState: null,
  canvasStates: {
    data: [],
    position: -1,
  },
  selectedColorSlot: (Object.keys(DefaultColors) as IColorsName[])[0],
  // canvasStates: JSON.stringify({
  //   data: [],
  //   position: -1,
  // }),
};

export const paintSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    // setCanvasState: (state, action: PayloadAction<ImageData | null>) => {
    //   state.canvasState = action.payload;
    // },

    setSelectedColorSlot: (state, action: PayloadAction<IColorsName>) => {
      state.selectedColorSlot = action.payload;
    },

    setCanvasStates: (state, action: PayloadAction<ICanvasStates>) => {
      state.canvasStates = action.payload;
    },

    setPaintToolName: (state, action: PayloadAction<ToolNames>) => {
      state.toolName = action.payload;
    },

    setColorPalette: (state, action: PayloadAction<IColorsPalette>) => {
      state.colorsPalette = action.payload;
    },

    changeSavedStatePosition: (state, action: PayloadAction<number>) => {
      state.canvasStates = {
        ...state.canvasStates,
        position: action.payload,
      };
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
export const { setColorPalette, setPaintToolName, setCanvasStates, changeSavedStatePosition, setSelectedColorSlot } =
  paintSlice.actions;

export default paintSlice.reducer;
