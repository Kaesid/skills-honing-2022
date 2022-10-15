import { IPaintEvent, ITool } from "../interface";
import { ToolNames } from "../SideMenu/constants";

class Tool {
  name: keyof typeof ToolNames | null;
  isDrawing: boolean;
  protected readonly canvas: ITool["canvasRef"];
  protected readonly ctx: ITool["ctxRef"];
  protected readonly position: ITool["position"];
  protected readonly color: ITool["colorRef"];

  constructor(props: ITool) {
    const { canvasRef, ctxRef, position, colorRef } = props;
    this.name = null;
    this.isDrawing = false;
    this.canvas = canvasRef;
    this.ctx = ctxRef;
    this.position = position;
    this.color = colorRef;
  }

  handleCursorMove(e: IPaintEvent) {}

  handleDrawActivation() {}

  handleDrawFinish() {}

  handleDraw() {}
}

export { Tool };
