import { Tool } from "./Tool";

class Rectangle extends Tool {
  handleToolDrawActivation() {
    this.saveCanvasData();
    this.ctx.beginPath();
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  handleDraw() {
    const width = this.position.x - this.startPosition.x;
    const height = this.position.y - this.startPosition.y;
    this.restoreCanvasState();
    this.ctx.fillRect(this.startPosition.x, this.startPosition.y, width, height);
  }
}

export { Rectangle };
