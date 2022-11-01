import { ICoordinates, IPaintEvent, ITool } from "../interface";
import { ToolNames } from "../SideMenu/constants";

class Tool {
  protected isDrawing: boolean;
  protected isToolMoving: boolean;
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;
  protected readonly position: ICoordinates;
  protected readonly color: ITool["colorRef"];
  protected lineWidth: number;
  protected readonly savedCanvasDataRef: ITool["savedCanvasDataRef"];
  protected startPosition: ICoordinates;
  protected activeTool: React.MutableRefObject<ToolNames>;
  protected canvasStates: ITool["canvasStatesRef"];
  protected changePosition: ITool["changePosiiton"];

  constructor(props: ITool) {
    const { canvasRef, ctxRef, colorRef, savedCanvasDataRef, toolRef, canvasStatesRef, changePosiiton } = props;
    this.canvas = canvasRef.current as HTMLCanvasElement;
    this.ctx = ctxRef.current as CanvasRenderingContext2D;
    this.savedCanvasDataRef = savedCanvasDataRef;
    this.canvasStates = canvasStatesRef;
    this.color = colorRef;
    this.activeTool = toolRef;
    this.position = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };
    this.lineWidth = 1;
    this.isDrawing = false;
    this.isToolMoving = false;
    this.changePosition = changePosiiton;
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

  handleDraw() {
    this.isToolMoving = true;
    this.handleToolDraw();
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

  ProcessSingleClickToolAction() {
    if (!this.isToolMoving && this.position.x === this.startPosition.x && this.position.y === this.startPosition.y) {
      this.singleClickAction();
    }
  }

  singleClickAction() {
    this.ctx.fillRect(this.position.x, this.position.y, this.lineWidth, this.lineWidth);
  }

  handleDrawFinish() {
    if (!this.isDrawing) return;
    this.ProcessSingleClickToolAction();
    this.isDrawing = false;
    this.isToolMoving = false;
    this.saveCanvasStateToList();
    this.handleToolDrawFinish();
  }

  saveCanvasTempData() {
    this.savedCanvasDataRef.current = this.canvasState;
  }

  protected get canvasState() {
    console.log(this.canvas.clientWidth);
    console.log(this.canvas.clientHeight);
    return this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  saveCanvasStateToList() {
    console.log("saveCanvasStateToList");
    // if (!this.savedCanvasDataRef.current) return;

    if (this.canvasStates.current.data.length > this.canvasStates.current.position + 1) {
      console.log("nope");
      // console.log(this.canvasStates.current.data.length);
      // console.log(this.canvasStates.current.position);
      this.canvasStates.current.data.length = this.canvasStates.current.position + 1;
      // this.canvasStates.current.position
    }
    this.canvasStates.current.data.push(this.canvasState);
    if (this.canvasStates.current.data.length > 5) {
      this.canvasStates.current.data.shift();
    } else {
      this.canvasStates.current.position += 1;
      this.changePosition(this.canvasStates.current.position);
    }

    console.log(this.canvasStates.current);
  }

  restoreCanvasTempState() {
    if (this.savedCanvasDataRef.current) this.ctx.putImageData(this.savedCanvasDataRef.current, 0, 0);
  }

  protected handleToolDrawActivation() {}
  protected handleToolDraw() {}
  protected handleToolDrawFinish() {}
}

export { Tool };
