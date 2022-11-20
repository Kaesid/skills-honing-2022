import { ICanvasParams, ISizeParams } from "../interface";

type ICanvas = ISizeParams & Pick<ICanvasParams, "canvasRef">;

export type { ICanvas };
