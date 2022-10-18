import { Tool } from "./Tool";

class Circle extends Tool {
  handleToolDrawActivation() {
    this.saveCanvasData();
    this.ctx.beginPath();
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  handleDraw() {
    this.ctx.fillStyle = this.color.current;
    this.ctx.lineWidth = 5;
    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);

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
