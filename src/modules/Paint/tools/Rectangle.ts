import { ICoordinates, ITool } from "../interface";
import { Tool } from "./Tool";

class Rectangle extends Tool {
  protected startPosition: ICoordinates;

  constructor(props: ITool) {
    super(props);
    this.startPosition = { x: 0, y: 0 };
  }

  handleDrawActivation() {
    this.ctx.beginPath();
    // this.ctx.lineTo(this.position.x, this.position.y);
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  handleDraw() {
    this.ctx.lineWidth = 10;
    this.ctx.fillStyle = this.color.current;
    this.ctx.strokeStyle = this.color.current;
    const width = this.position.x - this.startPosition.x;
    const height = this.position.y - this.startPosition.y;

    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);

    this.ctx.fillRect(this.startPosition.x, this.startPosition.y, width, height);
  }

  handleDrawFinish() {
    this.ctx.stroke();
  }
}

export { Rectangle };
