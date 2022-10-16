import { Tool } from "./Tool";

class Eraser extends Tool {
  handleDraw() {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 3);
    this.ctx.fill();
  }
}

export { Eraser };
