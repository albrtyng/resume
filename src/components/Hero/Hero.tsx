import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import lottie from "lottie-web";
import scrollDown from "@assets/lotties/scroll-down.json";

import heroImage from "@assets/images/hero.png";
import { useBreakpoint } from "@lib/hooks/useBreakpoint";

const animateHeroImage = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 1 } },
};

const animateTitle = {
  hidden: {},
  visible: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.04,
    },
  },
};

const animateCharacter = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const animateSubtitle = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ease: "easeOut", duration: 1 },
  },
};

const animateTextContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.45,
    },
  },
};

const animateScrollIndicator = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 2.5,
    },
  },
};

export const Hero = () => {
  const mobileScrollIndicatorRef = useRef<HTMLDivElement>(null);
  const desktopScrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { isXs } = useBreakpoint();
  const title = "Build better software with albert.";

  useEffect(() => {
    if (mobileScrollIndicatorRef.current && isXs) {
      const animation = lottie.loadAnimation({
        container: mobileScrollIndicatorRef.current,
        animationData: scrollDown,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      return () => animation.destroy();
    }
  }, [isXs]);

  useEffect(() => {
    if (desktopScrollIndicatorRef.current && !isXs) {
      const animation = lottie.loadAnimation({
        container: desktopScrollIndicatorRef.current,
        animationData: scrollDown,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      return () => animation.destroy();
    }
  }, [isXs]);

  return (
    <section className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col justify-around lg:min-h-screen lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        className="flex w-full flex-wrap justify-center lg:w-1/2"
        initial="hidden"
        animate="visible"
        variants={animateTextContainer}>
        <motion.h1
          className="max-w-lg text-center font-alphapipe text-5xl font-semibold lg:text-left lg:text-6xl lg:tracking-tight xl:text-7xl"
          initial="hidden"
          animate="visible"
          variants={animateTitle}
          aria-label={title}>
          {title.split("").map((character, index) => {
            return (
              <motion.span aria-hidden key={index} variants={animateCharacter}>
                {character}
              </motion.span>
            );
          })}
        </motion.h1>
        <motion.p
          className="max-w-lg justify-center pt-4 text-center font-quicksand text-lg text-slate-600 lg:text-left"
          variants={animateSubtitle}>
          Albert is a University of Toronto CS graduate (2T0) and
          Contentful-certified Software Developer. Built with Astro.build,
          React, TailwindCSS.
        </motion.p>
        <motion.div
          className="flex h-16 w-full justify-center md:h-24 lg:hidden"
          initial="hidden"
          animate="visible"
          variants={animateScrollIndicator}>
          <div
            ref={mobileScrollIndicatorRef}
            className="h-16 w-16 md:h-24 md:w-24"
          />
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row"></div>
      </motion.div>

      <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
        {/* TODO: add hero image */}
        <motion.img
          src={heroImage.src}
          alt=""
          aria-hidden
          width={520}
          height={424}
          initial="hidden"
          animate="visible"
          variants={animateHeroImage}
        />
      </div>

      <motion.div
        className="bottom-0 left-1/2 hidden h-16 w-full -translate-x-1/2 justify-center md:h-24 lg:absolute lg:flex"
        initial="hidden"
        animate="visible"
        variants={animateScrollIndicator}>
        <div
          ref={desktopScrollIndicatorRef}
          className="h-16 w-16 md:h-24 md:w-24"
        />
      </motion.div>
    </section>
  );
};
