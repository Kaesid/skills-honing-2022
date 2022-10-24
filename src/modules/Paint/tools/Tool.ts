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
  protected canvasStates: ITool["canvasStates"];

  constructor(props: ITool) {
    const { canvasRef, ctxRef, colorRef, savedCanvasDataRef, toolRef, canvasStates } = props;
    this.canvas = canvasRef.current as HTMLCanvasElement;
    this.ctx = ctxRef.current as CanvasRenderingContext2D;
    this.savedCanvasDataRef = savedCanvasDataRef;
    this.canvasStates = canvasStates;
    this.color = colorRef;
    this.activeTool = toolRef;
    this.position = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };
    this.lineWidth = 1;
    this.isDrawing = false;
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
    this.saveStartPosition();
    this.handleToolDrawActivation();
  }

  saveStartPosition() {
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  setColor() {
    this.ctx.strokeStyle = this.color.current;
    this.ctx.fillStyle = this.color.current;
  }

  setLineWidth() {
    this.ctx.lineWidth = this.lineWidth;
  }

  handleDrawFinish() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.saveCanvasData();
    this.saveCanvasStateToList();
    this.handleToolDrawFinish();
  }

  saveCanvasData() {
    this.savedCanvasDataRef.current = this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  saveCanvasStateToList() {
    if (!this.savedCanvasDataRef.current) return;
    console.log(111);
    this.canvasStates.current.data.push(this.savedCanvasDataRef.current);
    if (this.canvasStates.current.data.length >= 10) this.canvasStates.current.data.shift();
    this.canvasStates.current.position = this.canvasStates.current.data.length - 1;
    console.log(this.canvasStates.current);
  }

  restoreCanvasState() {
    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);
  }

  protected handleToolDrawActivation() {}
  protected handleDraw() {}
  protected handleToolDrawFinish() {}
}

export { Tool };
