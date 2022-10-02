import styled, { css } from "styled-components";
import { downArrow } from "../../../../assets/images/svgrepo";
import { SCREEN_SIZES } from "../../../../constants/screen";

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

export { ColorPickerCollapsible, ColorPickerWrap };
