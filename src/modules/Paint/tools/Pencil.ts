import { Tool } from "./Tool";

class Pencil extends Tool {
  handleDrawActivation() {
    this.ctx.beginPath();
    this.ctx.lineTo(this.position.x, this.position.y);
  }

  handleDrawFinish() {
    this.ctx.closePath();
  }

  handleDraw() {
    this.ctx.strokeStyle = this.color.current;
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }
}

export { Pencil };
