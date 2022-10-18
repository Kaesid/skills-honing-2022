import { Tool } from "./Tool";

class Line extends Tool {
  handleToolDrawActivation() {
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  handleDraw() {
    this.ctx.strokeStyle = this.color.current;
    this.ctx.lineWidth = 2;
    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPosition.x, this.startPosition.y);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }

  handleToolDrawFinish() {}
}

export { Line };
