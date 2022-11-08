import { ITool } from "../../interface";
import { Tool } from "../Tool";

class Rectangle extends Tool {
  constructor(props: ITool) {
    super(props);
    this.lineWidth = 5;
  }

  handleToolDrawActivation() {
    this.saveCanvasTempData();
    this.ctx.beginPath();
  }

  handleToolDraw() {
    const width = this.position.x - this.startPosition.x;
    const height = this.position.y - this.startPosition.y;
    this.restoreCanvasTempState();
    this.ctx.fillRect(this.startPosition.x, this.startPosition.y, width, height);
  }
}

export { Rectangle };
