import { useEffect, useState } from "react";

const breakpoints = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1440,
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<{ [key: string]: boolean }>({
    isXs: false,
    isMd: false,
    isLg: false,
    isXl: false,
  });
  const [windowSize, setWindowSize] = useState<{
    [key: string]: number;
  }>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < breakpoints.md) {
      setBreakPoint({
        isXs: true,
        isMd: false,
        isLg: false,
        isXl: false,
      });
    }
    if (
      breakpoints.md <= windowSize.width &&
      windowSize.width < breakpoints.lg
    ) {
      setBreakPoint({
        isXs: true,
        isMd: true,
        isLg: false,
        isXl: false,
      });
    }
    if (
      breakpoints.lg <= windowSize.width &&
      windowSize.width < breakpoints.xl
    ) {
      setBreakPoint({
        isXs: false,
        isMd: false,
        isLg: true,
        isXl: false,
      });
    }
    if (windowSize.width >= breakpoints.xl) {
      setBreakPoint({
        isXs: false,
        isMd: false,
        isLg: true,
        isXl: true,
      });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);
  return breakpoint;
};
