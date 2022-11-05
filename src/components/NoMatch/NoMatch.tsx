import { noMatchImage } from "../../assets/images";
import { PageSizeImageWrap } from "../../styles/styled-components/basic";
import { NoMatchTitle } from "./styled-components";

const NoMatch = () => {
  const noMatchText = "It seems like you're lost, mate...";

  return (
    <div>
      <NoMatchTitle>{noMatchText}</NoMatchTitle>
      <PageSizeImageWrap>
        <img src={noMatchImage} alt="bugs bunny" />
      </PageSizeImageWrap>
    </div>
  );
};

export default NoMatch;
