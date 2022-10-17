import { ICoordinates, IPaintEvent, ITool } from "../interface";

class Tool {
  protected isDrawing: boolean;
  protected readonly ctx: CanvasRenderingContext2D;
  protected readonly position: ICoordinates;
  protected readonly color: ITool["colorRef"];
  protected readonly savedCanvasDataRef: ITool["savedCanvasDataRef"];

  constructor(props: ITool) {
    const { ctxRef, position, colorRef, savedCanvasDataRef } = props;
    this.isDrawing = false;
    this.ctx = ctxRef.current as CanvasRenderingContext2D;
    this.position = position.current;
    this.color = colorRef;
    this.savedCanvasDataRef = savedCanvasDataRef;
  }

  handleCursorMove(e: IPaintEvent) {}

  handleDrawActivation() {}

  handleDrawFinish() {}

  handleDraw() {}
}

export { Tool };
