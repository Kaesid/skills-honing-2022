import { ITool } from "../interface";
import { Pencil } from "./Pencil";

class Eraser extends Pencil {
  constructor(props: ITool) {
    super(props);
    this.lineWidth = 15;
  }

  setColor() {
    this.ctx.strokeStyle = "white";
    this.ctx.fillStyle = "white";
  }
}

export { Eraser };
