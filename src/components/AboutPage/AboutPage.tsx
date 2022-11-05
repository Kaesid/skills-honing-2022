import { appName, Messages } from "../../constants/text";
import { AboutTitle } from "./styled-components";

const AboutPage = () => {
  return (
    <div>
      <AboutTitle>{appName}</AboutTitle>
      <div>
        <p>{Messages.ABOUT__TECHNOLOGIES}</p>
        <p>{Messages.ABOUT__PARTING_WORDS}</p>
      </div>
    </div>
  );
};

export default AboutPage;
