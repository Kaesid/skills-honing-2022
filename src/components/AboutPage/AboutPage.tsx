import { appName, Messages } from "../../constants/text";
import { DefaultOnePager, GradientTitle } from "../../styles/styled-components/basic";

const AboutPage = () => {
  return (
    <DefaultOnePager>
      <GradientTitle>{appName}</GradientTitle>
      <div>
        <p>{Messages.ABOUT__TECHNOLOGIES}</p>
        <p>{Messages.ABOUT__PARTING_WORDS}</p>
      </div>
    </DefaultOnePager>
  );
};

export default AboutPage;
