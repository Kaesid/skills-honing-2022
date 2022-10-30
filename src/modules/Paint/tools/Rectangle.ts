import { Tool } from "./Tool";

class Rectangle extends Tool {
  handleToolDrawActivation() {
    this.saveCanvasData();
    this.ctx.beginPath();
  }

  handleToolDraw() {
    const width = this.position.x - this.startPosition.x;
    const height = this.position.y - this.startPosition.y;
    this.restoreCanvasState();
    this.ctx.fillRect(this.startPosition.x, this.startPosition.y, width, height);
  }
}

export { Rectangle };
