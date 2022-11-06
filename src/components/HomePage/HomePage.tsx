import { useNavigate } from "react-router-dom";
import { DefaultOnePager, GradientTitle, PageSizeImageWrap } from "../../styles/styled-components/basic";
import { useAppDispatch } from "./../../redux/hooks";
import { redirectToCanvasActionName } from "./constants";
import { canvasImage } from "../../assets/images";
import { ButtonWrap, RedirectButton } from "./styled-components";
import { appName, Messages } from "../../constants/text";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const redirectWithSagaJustForFun = () => dispatch({ type: redirectToCanvasActionName, navigate });

  return (
    <DefaultOnePager>
      <GradientTitle>{appName}</GradientTitle>
      <ButtonWrap>
        <RedirectButton onClick={redirectWithSagaJustForFun}>{Messages.HOME__BUTTON_TEXT}</RedirectButton>
      </ButtonWrap>
      <PageSizeImageWrap>
        <img src={canvasImage} alt="canvas" />
      </PageSizeImageWrap>
    </DefaultOnePager>
  );
};

export default HomePage;
