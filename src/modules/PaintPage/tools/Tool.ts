import { ICanvasStates, ICoordinates, IPaintEvent, ITool } from "../interface";

class Tool {
  protected isDrawing: boolean;
  protected isToolMoving: boolean;
  protected lineWidth: number;
  protected tempCanvasData: ImageData | null;
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;
  protected readonly position: ICoordinates;
  protected readonly color: ITool["colorRef"];
  protected readonly startPosition: ICoordinates;
  protected readonly activeTool: ITool["toolRef"];
  protected readonly canvasStates: ICanvasStates;
  protected readonly changePosition: ITool["changePosiiton"];

  constructor(props: ITool) {
    const { canvasRef, ctxRef, colorRef, toolRef, canvasStatesRef, changePosiiton } = props;
    this.canvas = canvasRef.current as HTMLCanvasElement;
    this.ctx = ctxRef.current as CanvasRenderingContext2D;
    this.tempCanvasData = null;
    this.canvasStates = canvasStatesRef.current;
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
    this.setEventPosition(e);
    if (this.isDrawing) this.handleDraw();
  }

  setEventPosition(e: IPaintEvent) {
    if (e instanceof MouseEvent) this.setMouseEventPosition(e);
    if (window.TouchEvent && e instanceof TouchEvent) this.setTouchEventPosition(e);
  }

  setMouseEventPosition(e: MouseEvent) {
    [this.position.x, this.position.y] = [e.offsetX, e.offsetY];
  }

  protected setTouchEventPosition(e: TouchEvent) {
    const { x, y } = (e.target as HTMLElement).getBoundingClientRect();
    const { clientX, clientY } = e.targetTouches[0];
    [this.position.x, this.position.y] = [clientX - x, clientY - y];
  }

  handleDrawActivation(e: IPaintEvent) {
    this.isDrawing = true;
    this.setColor();
    this.setLineWidth();
    this.setEventPosition(e);
    this.saveStartPosition();
    this.handleToolDrawActivation();
  }

  handleDraw() {
    this.isToolMoving = true;
    this.handleToolDraw();
  }

  private saveStartPosition() {
    [this.startPosition.x, this.startPosition.y] = [this.position.x, this.position.y];
  }

  protected setColor() {
    this.ctx.strokeStyle = this.color.current;
    this.ctx.fillStyle = this.color.current;
  }

  private setLineWidth() {
    this.ctx.lineWidth = this.lineWidth;
  }

  protected ProcessSingleClickToolAction() {
    if (!this.isToolMoving && this.position.x === this.startPosition.x && this.position.y === this.startPosition.y) {
      this.singleClickAction();
    }
  }

  protected singleClickAction() {
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
    this.tempCanvasData = this.canvasState;
  }

  protected get canvasState() {
    return this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  removeSavedStatesAfterCurrentPosition() {
    if (this.canvasStates.data.length > this.canvasStates.position + 1) {
      this.canvasStates.data.length = this.canvasStates.position + 1;
    }
  }

  saveCanvasStateToList() {
    this.removeSavedStatesAfterCurrentPosition();

    this.canvasStates.data.push(this.canvasState);
    if (this.canvasStates.data.length > 5) {
      this.canvasStates.data.shift();
    } else {
      this.canvasStates.position += 1;
      this.changePosition(this.canvasStates.position);
    }
  }

  restoreCanvasTempState() {
    if (this.tempCanvasData) this.ctx.putImageData(this.tempCanvasData, 0, 0);
  }

  protected handleToolDrawActivation() {}
  protected handleToolDraw() {}
  protected handleToolDrawFinish() {}
}

export { Tool };
