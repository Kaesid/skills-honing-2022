import { ITool } from "../interface";
import { Tool } from "./Tool";

class Line extends Tool {
  constructor(props: ITool) {
    super(props);
    this.lineWidth = 3;
  }

  handleToolDrawActivation() {
    this.saveCanvasData();
  }

  handleToolDraw() {
    this.restoreCanvasState();
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPosition.x, this.startPosition.y);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }
}

export { Line };
