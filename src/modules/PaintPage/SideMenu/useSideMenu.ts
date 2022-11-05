import { setPaintToolName } from "../paintSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { ToolNames } from "./constants";
import { IUseSideMenu } from "./interface";

const useSideMenu = (props: IUseSideMenu) => {
  const { toolRef } = props;
  const dispatch = useAppDispatch();

  const setToolName = (toolName: ToolNames) => {
    toolRef.current = toolName;
    dispatch(setPaintToolName(toolName));
  };

  return { setToolName };
};

export { useSideMenu };
