import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";

const SideMenuStyled = styled.div`
  background: rgba(9, 9, 121, 1);
  color: white;
  height: 100vh;
  width: max(15%, 100px);
  /* width: 20%; */
  margin-top: -40px;
  /* border-top: 1px gray solid; */
  padding-top: 5px;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100vw;
    height: 200px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

export { SideMenuStyled };
