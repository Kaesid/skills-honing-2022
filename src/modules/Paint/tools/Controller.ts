import { IPaintEvent, ITool, IToolsList } from "../interface";
import { ToolNames } from "../SideMenu/constants";
import { Brush } from "./Brush";
import { Circle } from "./Circle";
import { Eraser } from "./Eraser";
import { Line } from "./Line";
import { Pencil } from "./Pencil";
import { Rectangle } from "./Rectangle";
import { Tool } from "./Tool";

class Controller extends Tool {
  protected toolsList: IToolsList;
  constructor(props: ITool) {
    super(props);
    this.toolsList = {
      [ToolNames.PENCIL]: new Pencil(props),
      [ToolNames.ERASER]: new Eraser(props),
      [ToolNames.BRUSH]: new Brush(props),
      [ToolNames.LINE]: new Line(props),
      [ToolNames.RECTANGLE]: new Rectangle(props),
      [ToolNames.CIRCLE]: new Circle(props),
    };
  }

  setListeners() {
    this.canvas.addEventListener("mousemove", (e: IPaintEvent) =>
      this.toolsList[this.activeTool.current].handleCursorMove(e)
    );

    this.canvas.addEventListener("mousedown", (e: IPaintEvent) =>
      this.toolsList[this.activeTool.current].handleDrawActivation(e)
    );

    this.canvas.addEventListener("mouseup", () => this.toolsList[this.activeTool.current].handleDrawFinish());

    this.canvas.addEventListener("mouseout", () => this.toolsList[this.activeTool.current].handleDrawFinish());

    this.canvas.addEventListener("touchstart", (e: IPaintEvent) =>
      this.toolsList[this.activeTool.current].handleDrawActivation(e)
    );

    this.canvas.addEventListener("touchend", () => this.toolsList[this.activeTool.current].handleDrawFinish());

    this.canvas.addEventListener("touchmove", (e: IPaintEvent) =>
      this.toolsList[this.activeTool.current].handleCursorMove(e)
    );

    this.canvas.addEventListener("touchcancel", () => this.toolsList[this.activeTool.current].handleDrawFinish());
  }
}

export { Controller };
