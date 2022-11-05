import styled from "styled-components";

const PageSizeImageWrap = styled.div`
  height: 80vh;

  img {
    object-fit: contain;
    width: 100%;
    max-height: 100%;
  }
`;

const BasicTitle = styled.p`
  max-width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: calc(18px + 2vw);
  font-weight: bold;
`;

export { PageSizeImageWrap, BasicTitle };
