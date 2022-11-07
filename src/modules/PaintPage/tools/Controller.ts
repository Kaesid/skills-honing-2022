import { IPaintEvent, ITool, IToolsList } from "../interface";
import { ToolNames } from "../SideMenu/constants";
import { Brush, Circle, Eraser, Line, Pencil, Rectangle } from "./components";
import { Tool } from "./Tool";

class Controller extends Tool {
  protected toolsList: IToolsList;

  constructor(props: ITool) {
    super(props);
    const { PENCIL, ERASER, BRUSH, LINE, RECTANGLE, CIRCLE } = ToolNames;
    this.toolsList = {
      [PENCIL]: new Pencil(props),
      [ERASER]: new Eraser(props),
      [BRUSH]: new Brush(props),
      [LINE]: new Line(props),
      [RECTANGLE]: new Rectangle(props),
      [CIRCLE]: new Circle(props),
    };
  }

  private get selectedTool() {
    return this.toolsList[this.activeTool.current];
  }

  setListeners() {
    this.canvas.addEventListener("mousemove", (e: IPaintEvent) => this.selectedTool.handleCursorMove(e));

    this.canvas.addEventListener("mousedown", (e: IPaintEvent) => this.selectedTool.handleDrawActivation(e));

    this.canvas.addEventListener("mouseup", () => this.selectedTool.handleDrawFinish());

    this.canvas.addEventListener("mouseout", () => this.selectedTool.handleDrawFinish());

    this.canvas.addEventListener("touchstart", (e: IPaintEvent) => this.selectedTool.handleDrawActivation(e));

    this.canvas.addEventListener("touchend", () => this.selectedTool.handleDrawFinish());

    this.canvas.addEventListener("touchmove", (e: IPaintEvent) => this.selectedTool.handleCursorMove(e));

    this.canvas.addEventListener("touchcancel", () => this.selectedTool.handleDrawFinish());
  }

  removeListeners() {
    this.canvas.removeEventListener("mousemove", (e: IPaintEvent) => this.selectedTool.handleCursorMove(e));

    this.canvas.removeEventListener("mousedown", (e: IPaintEvent) => this.selectedTool.handleDrawActivation(e));

    this.canvas.removeEventListener("mouseup", () => this.selectedTool.handleDrawFinish());

    this.canvas.removeEventListener("mouseout", () => this.selectedTool.handleDrawFinish());

    this.canvas.removeEventListener("touchstart", (e: IPaintEvent) => this.selectedTool.handleDrawActivation(e));

    this.canvas.removeEventListener("touchend", () => this.selectedTool.handleDrawFinish());

    this.canvas.removeEventListener("touchmove", (e: IPaintEvent) => this.selectedTool.handleCursorMove(e));

    this.canvas.removeEventListener("touchcancel", () => this.selectedTool.handleDrawFinish());
  }
}

export { Controller };
