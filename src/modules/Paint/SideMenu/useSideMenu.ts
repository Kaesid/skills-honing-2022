import { setPaintToolName } from "../paintSlice";
import { useAppDispatch } from "./../../../redux/hooks";
import { ToolNames } from "./constants";
import { useEffect } from "react";
import { IUseSideMenu } from "./interface";

const useSideMenu = (props: IUseSideMenu) => {
  const { toolRef, toolName } = props;
  const dispatch = useAppDispatch();

  const setToolName = (toolName: ToolNames) => {
    toolRef.current = toolName;
    dispatch(setPaintToolName(toolName));
  };

  useEffect(() => {
    if (toolName !== ToolNames.PENCIL) setToolName(ToolNames.PENCIL);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { setToolName };
};

export { useSideMenu };
