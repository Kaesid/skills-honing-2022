import { IPaintEvent, ITool } from "../interface";
import { ToolNames } from "../SideMenu/constants";
import { Tool } from "./Tool";

class Pencil extends Tool {
  constructor(props: ITool) {
    super(props);
    this.name = ToolNames.PENCIL;
  }

  handleCursorMove(e: IPaintEvent) {}

  handleDrawActivation() {
    if (!this.ctx.current || !this.position.current) return;
    this.ctx.current.beginPath();
    this.ctx.current.lineTo(this.position.current.x, this.position.current.y);
  }

  handleDrawFinish() {
    if (!this.ctx.current) return;
    this.ctx.current.closePath();
  }

  handleDraw() {
    if (!this.ctx.current || !this.position.current) return;
    this.ctx.current.strokeStyle = this.color.current;
    this.ctx.current.lineTo(this.position.current.x, this.position.current.y);
    this.ctx.current.stroke();
  }
}

export { Pencil };
