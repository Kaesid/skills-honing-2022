import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { DefaultColors } from "./constants";
import { ICanvasStates, IColorsName, IColorsPalette } from "./interface";
import { ToolNames } from "./SideMenu/constants";

interface IPaintState {
  isSessionActive: boolean;
  toolName: ToolNames;
  colorsPalette: IColorsPalette;
  canvasStates: ICanvasStates;
  selectedColorSlot: IColorsName;
}

const initialState: IPaintState = {
  isSessionActive: false,
  toolName: ToolNames.PENCIL,
  colorsPalette: DefaultColors,
  canvasStates: {
    data: [],
    position: -1,
  },
  selectedColorSlot: (Object.keys(DefaultColors) as IColorsName[])[0],
};

export const paintSlice = createSlice({
  name: "paint",
  initialState,

  reducers: {
    setSessionActive: state => {
      state.isSessionActive = true;
    },

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
  },
});

const getPaintToolName = (state: RootState) => state.paint.toolName;
const getIsSessionActive = (state: RootState) => state.paint.isSessionActive;
const getColorPalette = (state: RootState) => state.paint.colorsPalette;
const getPaintState = (state: RootState) => state.paint;

export const {
  setSessionActive,
  setColorPalette,
  setPaintToolName,
  setCanvasStates,
  changeSavedStatePosition,
  setSelectedColorSlot,
} = paintSlice.actions;

export default paintSlice.reducer;

export { getPaintToolName, getColorPalette, getPaintState, getIsSessionActive };
