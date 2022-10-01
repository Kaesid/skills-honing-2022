import styled, { css } from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";
import { linkActiveColor } from "../../../constants/styled-components";
import { downArrow } from "../../../assets/images/svgrepo";

const SideMenuStyled = styled.div`
  background: #484854;
  color: white;
  height: calc(100vh - 40px);
  width: max(15%, 100px);
  /* width: fit-content; */
  /* width: 20%; */
  margin-top: -40px;
  /* border-top: 1px gray solid; */

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100vw;
    height: fit-content;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  & .react-colorful {
    width: 100%;
  }

  & .react-colorful__saturation {
    border-radius: 0;
  }
`;

const IconsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px;

  svg {
    width: 30px;
    height: 30px;

    path {
      fill: white;
    }

    circle {
      stroke: white;
    }
  }

  .active {
    svg {
      path {
        fill: ${linkActiveColor};
      }
      circle {
        stroke: ${linkActiveColor};
      }
    }
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid white;
  cursor: pointer;
`;

const ColorPickerCollapsible = styled.div`
  width: 100%;
  object-fit: contain;
  height: 40px;
  cursor: pointer;
  border: 1px solid #44a1b5;

  &::after {
    content: "";
    display: inline-block;
    position: relative;
    left: calc(100% - 25px);
    width: 20px;
    height: 40px;
    background-image: url(${downArrow});
    background-repeat: no-repeat;
    background-position: center center;
  }

  ${(props: { $isOpen: boolean }) =>
    props.$isOpen &&
    css`
      &::after {
        transform: rotate(180deg);
      }
    `}
`;

const ColorPickerCollapsibleColor = styled.div`
  height: 30px;
`;

const ColorPickerWrap = styled.div`
  max-width: 100%;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    .react-colorful {
      width: 100%;
    }
  }
`;

export { SideMenuStyled, IconsBox, IconBox, ColorPickerWrap, ColorPickerCollapsible, ColorPickerCollapsibleColor };
