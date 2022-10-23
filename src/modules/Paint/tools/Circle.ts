import { ITool } from "../interface";
import { Tool } from "./Tool";

class Circle extends Tool {
  constructor(props: ITool) {
    super(props);
    this.lineWidth = 5;
  }

  handleToolDrawActivation() {
    this.saveCanvasData();
    this.ctx.beginPath();
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  handleDraw() {
    this.restoreCanvasState();
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPosition.x, this.startPosition.y + (this.position.y - this.startPosition.y) / 2);
    this.ctx.bezierCurveTo(
      this.startPosition.x,
      this.startPosition.y,
      this.position.x,
      this.startPosition.y,
      this.position.x,
      this.startPosition.y + (this.position.y - this.startPosition.y) / 2
    );
    this.ctx.bezierCurveTo(
      this.position.x,
      this.position.y,
      this.startPosition.x,
      this.position.y,
      this.startPosition.x,
      this.startPosition.y + (this.position.y - this.startPosition.y) / 2
    );
    this.ctx.closePath();
    this.ctx.fill();
  }
}

export { Circle };
