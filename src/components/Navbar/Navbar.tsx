import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import { Variants, motion, useScroll } from "framer-motion";
import logoBlack from "@assets/lotties/logo-black.json";
import { MenuButton } from "./MenuButton";
import { useBreakpoint } from "@lib/hooks/useBreakpoint";
import { useFocusTrap } from "@lib/hooks/useTrapFocus";

const animateNavBar: Variants = {
  hidden: {
    opacity: 0,
    y: -80,
    transition: { ease: "easeInOut", duration: 0.6 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.6,
      delayChildren: 1.5,
      staggerChildren: 0.2,
    },
  },
};

const animateNavMenu: Variants = {
  hidden: {
    height: 0,
    transition: { duration: 0.8, ease: [0.96, 0, 0.6, 0.96] },
  },
  visible: {
    height: "100vh",
    transition: {
      duration: 0.8,
      ease: [0.96, 0, 0.6, 0.96],
      delayChildren: 0.4,
    },
  },
};

const animateNavChildren: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    transition: { ease: "easeInOut", duration: 0.25 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeInOut", duration: 0.25 },
  },
};

export const Navbar = () => {
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const desktopLogoRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean | undefined>(undefined);

  useFocusTrap(navMenuRef, { isActive: menuOpen });

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { isXs } = useBreakpoint();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (mobileLogoRef.current && isXs) {
      const mobileLogo = lottie.loadAnimation({
        container: mobileLogoRef.current,
        animationData: logoBlack,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      return () => mobileLogo.destroy();
    }
  }, [isXs]);

  useEffect(() => {
    if (desktopLogoRef.current && !isXs) {
      const desktopLogo = lottie.loadAnimation({
        container: desktopLogoRef.current,
        animationData: logoBlack,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      return () => desktopLogo.destroy();
    }
  }, [isXs]);

  scrollY.on("change", () => {
    if (scrollY?.get() < scrollY?.getPrevious()) {
      setHidden(false);
    } else if (scrollY?.get() > 25 && scrollY?.get() > scrollY?.getPrevious()) {
      setHidden(true);
    }
  });

  return (
    <>
      <motion.div
        variants={animateNavBar}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        className="sticky top-0 z-50 flex h-16 w-[100vw] items-center justify-between bg-white px-5 md:h-20 lg:hidden">
        <div ref={mobileLogoRef} className="h-10 w-28 md:h-11" />
        <MenuButton setOpen={setMenuOpen} open={menuOpen} />
        <motion.div
          ref={navMenuRef}
          variants={animateNavMenu}
          initial="hidden"
          animate={menuOpen ? "visible" : "hidden"}
          className="absolute top-0 z-10 -mx-5 mt-16 w-[100vw] overflow-hidden bg-white px-5 font-quicksand lg:hidden"
          aria-hidden={!menuOpen}>
          <motion.nav
            variants={animateNavChildren}
            className="mt-4 flex flex-col gap-6">
            {/* TODO: replace links */}
            <a href="https://placeholder" className="w-full text-4xl">
              Projects
            </a>
            <a href="https://placeholder" className="w-full text-4xl">
              Resume
            </a>
            <button className="w-max rounded-md bg-slate-500 px-4 py-2 text-xl text-white">
              Get Started
            </button>
          </motion.nav>
        </motion.div>
      </motion.div>

      <motion.div
        variants={animateNavBar}
        initial="hidden"
        animate="visible"
        className="sticky top-4 z-50 mt-4 hidden w-full items-center justify-center lg:flex">
        <nav className="flex h-14 w-full max-w-lg items-center justify-between overflow-hidden rounded-lg bg-gray-100/80 p-2 font-quicksand text-base backdrop-blur-md">
          <div ref={desktopLogoRef} className="h-10 w-28" />
          <motion.a variants={animateNavChildren} href="https://placeholder">
            Projects
          </motion.a>
          <motion.a variants={animateNavChildren} href="https://placeholder">
            Resume
          </motion.a>
          <motion.button
            variants={animateNavChildren}
            className="h-full w-max rounded-md bg-slate-500 px-4 py-2 text-white">
            Get Started
          </motion.button>
        </nav>
      </motion.div>
    </>
  );
};
