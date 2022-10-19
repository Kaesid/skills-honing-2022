import styled, { css, keyframes } from "styled-components";
import { downArrow } from "../../../../assets/images/svgrepo";
import { SCREEN_SIZES } from "../../../../constants/screen";
import { IPaletteSlot } from "../../interface";

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
  height: 40px;
  cursor: pointer;
  background-color: ${props => props.$color};

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

  ${(props: { $isOpen: boolean; $color: string }) =>
    props.$isOpen &&
    css`
      &::after {
        transform: rotate(180deg);
      }
    `}
`;

const HexColorPickerWrap = styled.div`
  max-width: 100%;
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
  /* border: 1px white solid; */
  padding: 2px 5px;
`;

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

const PaletteSlot = styled.button.attrs((props: IPaletteSlot) => ({
  style: {
    backgroundColor: props.color,
  },
}))`
  position: relative;
  width: 30px;
  height: 30px;

  ${(props: IPaletteSlot) =>
    props.isSelected &&
    css`
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
        background-color: ${props.color};
        height: 97%;
        width: 97%;
        top: 1.5%;
        left: 1.5%;
      }
    `}
`;

export { ColorPickerCollapsible, HexColorPickerWrap, PaletteSlot, Palette, ColorPickerWrap };
