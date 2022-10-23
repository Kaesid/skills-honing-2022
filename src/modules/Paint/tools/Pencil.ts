import { Tool } from "./Tool";

class Pencil extends Tool {
  handleToolDrawActivation() {
    this.ctx.beginPath();
    this.ctx.lineTo(this.position.x, this.position.y);
  }

  handleDraw() {
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }

  handleToolDrawFinish() {
    this.ctx.closePath();
  }
}

export { Pencil };
