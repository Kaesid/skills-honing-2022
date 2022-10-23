import { ICoordinates, IPaintEvent, ITool } from "../interface";
import { ToolNames } from "../SideMenu/constants";

class Tool {
  protected isDrawing: boolean;
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;
  protected readonly position: ICoordinates;
  protected readonly color: ITool["colorRef"];
  protected lineWidth: number;
  protected readonly savedCanvasDataRef: ITool["savedCanvasDataRef"];
  protected startPosition: ICoordinates;
  protected activeTool: React.MutableRefObject<ToolNames>;

  constructor(props: ITool) {
    const { canvasRef, ctxRef, colorRef, savedCanvasDataRef, toolRef } = props;
    this.isDrawing = false;
    this.canvas = canvasRef.current as HTMLCanvasElement;
    this.ctx = ctxRef.current as CanvasRenderingContext2D;
    this.position = { x: 0, y: 0 };
    this.color = colorRef;
    this.savedCanvasDataRef = savedCanvasDataRef;
    this.startPosition = { x: 0, y: 0 };
    this.activeTool = toolRef;
    this.lineWidth = 1;
  }

  handleCursorMove(e: IPaintEvent) {
    this.setTouchEventPosition(e);
    if (e instanceof MouseEvent) [this.position.x, this.position.y] = [e.offsetX, e.offsetY];

    if (this.isDrawing) this.handleDraw();
  }

  protected setTouchEventPosition(e: IPaintEvent) {
    if (!window.TouchEvent || !(e instanceof TouchEvent)) return;
    const bcr = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;
    [this.position.x, this.position.y] = [x, y];
  }

  handleDrawActivation(e: IPaintEvent) {
    this.isDrawing = true;
    this.setColor();
    this.setLineWidth();
    this.setTouchEventPosition(e);
    this.handleToolDrawActivation();
  }

  setColor() {
    this.ctx.strokeStyle = this.color.current;
    this.ctx.fillStyle = this.color.current;
  }

  setLineWidth() {
    this.ctx.lineWidth = this.lineWidth;
  }

  protected handleToolDrawActivation() {}

  handleDrawFinish() {
    this.isDrawing = false;
    this.saveCanvasData();
    this.handleToolDrawFinish();
  }

  protected handleToolDrawFinish() {}

  protected handleDraw() {}

  saveCanvasData() {
    this.savedCanvasDataRef.current = this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  restoreCanvasState() {
    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);
  }
}

export { Tool };
