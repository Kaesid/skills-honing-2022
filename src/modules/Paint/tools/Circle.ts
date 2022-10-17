import { Tool } from "./Tool";

class Circle extends Tool {
  handleDrawActivation() {
    this.ctx.beginPath();
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  handleDraw() {
    this.ctx.fillStyle = this.color.current;
    const width = this.position.x - this.startPosition.x;
    const height = this.position.y - this.startPosition.y;

    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);

    // this.ctx.fillRect(this.startPosition.x, this.startPosition.y, width, height);
    this.ctx.arc(this.startPosition.x, this.startPosition.y, Math.sqrt(width ** 2 + height ** 2), 0, 3 * Math.PI);
    this.ctx.fill();
  }

  handleDrawFinish() {}
}

export { Circle };
