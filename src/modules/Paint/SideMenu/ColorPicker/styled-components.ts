import styled, { css, keyframes } from "styled-components";
import { downArrow } from "../../../../assets/images/svgrepo";
import { SCREEN_SIZES } from "../../../../constants/screen";
const borderWidth = "3px";
const ColorPickerWrap = styled.div`
  ${(props: { $isOpen: boolean }) =>
    props.$isOpen &&
    css`
      & .Collapsible__contentOuter {
        padding-bottom: 5px;
      }
    `}
`;

const ColorPickerCollapsible = styled.div`
  width: 100%;
  object-fit: contain;
  height: 40px;
  cursor: pointer;
  /* border: 1px solid #44a1b5; */

  &::after {
    content: "";
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

const HexColorPickerWrap = styled.div`
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

const Palette = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  border: 1px white solid;
  padding: 2px 5px;
`;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;

const animatedgradient = keyframes`
   0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
`;

const PaletteSlot = styled.button`
  width: 30px;
  height: 30px;
  background: ${props => props.$color};
  ${(props: { $isSelected: boolean; $color: string }) =>
    props.$isSelected &&
    css`
      position: relative;
      border-radius: ${borderWidth};

      &::before {
        content: "";
        position: absolute;
        background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
        height: 125%;
        width: 125%;
        animation: ${animatedgradient} 3s ease alternate infinite;
        background-size: 300% 300%;
        left: -12.5%;
        top: -12.5%;
      }

      &::after {
        content: "";
        position: absolute;
        background-color: ${props.$color};
        height: 97%;
        width: 97%;
        top: 1.5%;
        left: 1.5%;
      }
    `}
`;

export { ColorPickerCollapsible, HexColorPickerWrap, PaletteSlot, Palette, ColorPickerWrap };
