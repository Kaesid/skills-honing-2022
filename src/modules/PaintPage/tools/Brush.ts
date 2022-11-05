import { ITool } from "../interface";
import { Pencil } from "./Pencil";

class Brush extends Pencil {
  constructor(props: ITool) {
    super(props);
    this.lineWidth = 5;
  }
}

export { Brush };
