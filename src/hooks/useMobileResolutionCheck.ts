import { useState, useEffect } from "react";

const checkIsMobileScreen = () => {
  const { innerWidth } = window;
  return innerWidth < 500;
};

const useMobileResolutionCheck = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobileScreen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobileScreen());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export { useMobileResolutionCheck };
