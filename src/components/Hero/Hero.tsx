import heroImage from "@assets/hero.png";
import { motion } from "framer-motion";

export const Hero = () => {
  const animateHeroImage = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 1 } },
  };

  const animateTitle = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
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

  const title = "Build better software with Albert";

  return (
    <main className="grid place-items-center pb-8 pt-16 md:pt-8 lg:grid-cols-2">
      <div className="pt-6 md:order-1 md:pb-6">
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
        initial="hidden"
        animate="visible"
        variants={animateTextContainer}>
        <motion.h1
          className="text-5xl font-bold lg:text-6xl lg:tracking-tight xl:text-7xl"
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
          className="max-w-xl pt-4 text-lg text-slate-600"
          variants={animateSubtitle}>
          Albert is a University of Toronto CS graduate (2T0) and
          Contentful-certified Software Developer.
          <br /> Built with Astro.build, React, TailwindCSS.
        </motion.p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row"></div>
      </motion.div>
    </main>
  );
};
