import { css } from "styled-components";

const metallicTheme = css`
  background-image: conic-gradient(
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6
  );

  /* box-shadow: inset #6e6e6e 0 0px 0px 3px, inset hsl(0deg 0% 15% / 80%) 0 -1px 5px 4px,
    inset hsl(0deg 0% 0% / 25%) 0 -1px 5px 4px, inset hsl(0deg 0% 100% / 70%) 0 2px 1px -3px,
    hsl(0deg 0% 0% / 15%) 0 -5px 6px 4px, hsl(0deg 0% 100% / 50%) 0 0px 0px 0px; */
  box-shadow: inset #919191 0 0px 2px -1px, inset hsl(0deg 0% 15% / 80%) 0 -1px 5px 4px, inset #b6b4c5 0 0px 28px 6px;
  border: 1px solid #a1a1a1;
  text-shadow: hsla(0, 0%, 40%, 0.5) 0 -1px 0, hsla(0, 0%, 100%, 0.6) 0 2px 1px;
`;

export { metallicTheme };
