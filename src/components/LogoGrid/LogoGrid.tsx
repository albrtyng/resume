import { motion, useAnimate, useScroll } from "framer-motion";
import { useState, useRef } from "react";
import {
  LogoTicker,
  TICKER_DIRECTION_LEFT,
  TICKER_DIRECTION_RIGHT,
} from "./LogoTicker";

const logoDimensions = {
  height: 112,
  width: 112,
};

export const LogoGrid = ({ items }: { items: Array<string> }) => {
  const [subtitleRef, animate] = useAnimate<HTMLParagraphElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [textAnimationPlayed, setTextAnimationPlayed] =
    useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "0.75 end"],
  });

  scrollYProgress.on("change", () => {
    if (scrollYProgress.get() === 1) {
      if (!textAnimationPlayed) {
        animate(
          subtitleRef.current,
          {
            opacity: [0, 1],
          },
          { ease: "easeOut", duration: 1 },
        );
        setTextAnimationPlayed(true);
      } else {
        animate(subtitleRef.current, { opacity: 1 });
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative flex h-96 w-screen content-center items-center justify-center bg-gray-200">
      <div className="absolute z-10 flex h-full w-screen flex-col flex-wrap content-center items-center justify-center bg-gray-200/90 px-8">
        <motion.p
          className="text-center font-alphapipe text-3xl font-bold lg:text-4xl"
          style={{
            scaleX: textAnimationPlayed ? 1 : scrollYProgress,
            scaleY: textAnimationPlayed ? 1 : scrollYProgress,
          }}>
          Integrate with the technologies you use
        </motion.p>
        <motion.p
          ref={subtitleRef}
          className="max-w-xl pt-4 text-center font-quicksand text-lg opacity-0 [text-wrap:balance] lg:max-w-2xl">
          {`Albert ships with the latest web stack out of the box, and he's always open to picking up new tricks! DevOps, Mobile Dev perhaps? ;)`}
        </motion.p>
      </div>
      <div className="flex h-[calc(100%-2px)] w-full max-w-7xl items-center justify-center overflow-hidden">
        <div className="flex w-full skew-y-12 flex-col gap-2">
          {[...Array(5).keys()].map((value) => (
            <LogoTicker
              className={value === 0 || value === 4 ? "hidden lg:block" : ""}
              key={value}
              duration={20}
              direction={
                value % 2 === 0 ? TICKER_DIRECTION_RIGHT : TICKER_DIRECTION_LEFT
              }>
              {items.map((item, index) => {
                return (
                  <img
                    className="m-3 -skew-y-12"
                    key={index}
                    src={item}
                    aria-hidden
                    alt=""
                    {...logoDimensions}
                  />
                );
              })}
            </LogoTicker>
          ))}
        </div>
      </div>
    </div>
  );
};
