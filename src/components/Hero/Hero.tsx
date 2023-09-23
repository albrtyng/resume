import { useEffect, useRef, type ReactNode } from "react";
import { type Variants, motion } from "framer-motion";
import lottie from "lottie-web";
import scrollDown from "@assets/lotties/scroll-down.json";

import { useBreakpoint } from "@lib/hooks/useBreakpoint";

const animateHeroImage: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 1 } },
};

const animateTitle: Variants = {
  hidden: {},
  visible: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.04,
    },
  },
};

const animateCharacter: Variants = {
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

const animateSubtitle: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ease: "easeOut", duration: 1 },
  },
};

const animateTextContainer: Variants = {
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

const animateScrollIndicator: Variants = {
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

type HeroProps = {
  image: ImageMetadata[];
  subtitle: ReactNode[];
};

export const Hero: React.FC<HeroProps> = ({ image, subtitle }) => {
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
    <section className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col justify-around lg:-mt-20 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between lg:py-20">
      <motion.div
        className="flex h-full w-full flex-wrap items-center justify-center lg:w-1/2"
        initial="hidden"
        animate="visible"
        variants={animateTextContainer}>
        <motion.h1
          className="max-w-xl px-8 text-center font-alphapipe text-4xl font-semibold md:px-0 lg:text-left lg:text-5xl lg:tracking-tight xl:text-6xl"
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
        <motion.div
          className="text-md prose max-w-xl justify-center text-center font-quicksand text-slate-600 md:text-lg lg:text-left"
          variants={animateSubtitle}>
          {subtitle}
        </motion.div>
        <motion.div
          className="flex h-16 w-full justify-center md:h-24 lg:hidden"
          initial="hidden"
          animate="visible"
          variants={animateScrollIndicator}>
          <div ref={mobileScrollIndicatorRef} className="h-16 w-16 md:h-24 md:w-24" />
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row"></div>
      </motion.div>

      <div className="relative flex h-full w-full justify-center lg:w-1/2 lg:justify-end">
        <motion.div
          className="image"
          aria-hidden
          initial="hidden"
          animate="visible"
          variants={animateHeroImage}>
          {/* {image} */}
          <img src={image.src} height={398} width={416} alt-text="" aria-hidden />
        </motion.div>
      </div>

      <motion.div
        className="bottom-0 left-1/2 hidden h-16 w-full -translate-x-1/2 justify-center md:h-24 lg:absolute lg:flex"
        initial="hidden"
        animate="visible"
        variants={animateScrollIndicator}>
        <div ref={desktopScrollIndicatorRef} className="h-16 w-16 md:h-24 md:w-24" />
      </motion.div>
    </section>
  );
};
