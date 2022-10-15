import { IPaintEvent, ITool } from "../interface";
import { ToolNames } from "../SideMenu/constants";
import { Tool } from "./Tool";

class Eraser extends Tool {
  constructor(props: ITool) {
    super(props);
    this.name = ToolNames.PENCIL;
  }

  handleDraw() {
    if (!this.ctx.current) return;
    this.ctx.current.fillStyle = "white";
    this.ctx.current.beginPath();
    this.ctx.current.arc(this.position.current.x, this.position.current.y, 10, 0, Math.PI * 3);
    this.ctx.current.fill();
  }
}

export { Eraser };
