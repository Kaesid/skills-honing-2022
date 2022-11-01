import { ITool } from "../interface";
import { Tool } from "./Tool";

class Circle extends Tool {
  constructor(props: ITool) {
    super(props);
    this.lineWidth = 2;
  }

  handleToolDrawActivation() {
    this.saveCanvasTempData();
    this.ctx.beginPath();
  }

  handleToolDraw() {
    this.restoreCanvasTempState();
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

  singleClickAction() {
    this.ctx.arc(this.position.x, this.position.y, this.lineWidth, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export { Circle };
