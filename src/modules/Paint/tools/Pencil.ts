import { ITool } from "../interface";
import { Tool } from "./Tool";

class Pencil extends Tool {
  protected lineWidth: number;

  constructor(props: ITool) {
    super(props);
    this.lineWidth = 1;
  }
  handleDrawActivation() {
    this.ctx.beginPath();
    this.ctx.lineTo(this.position.x, this.position.y);
  }

  handleDrawFinish() {
    this.ctx.closePath();
  }

  handleDraw() {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color.current;
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }
}

export { Pencil };
