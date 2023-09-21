import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import { type Variants, motion, useScroll } from "framer-motion";

import { MenuButton } from "./MenuButton";
import logoBlack from "@assets/lotties/logo-black.json";
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
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
        }
      }, 1000);
    } else {
      window.scrollTo(0, 0);
    }
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

  useEffect(() => {
    const unsub = scrollY.on("change", (value) => {
      if (!isXs) {
        return;
      }

      if (value < scrollY?.getPrevious()) {
        setHidden(false);
      } else if (value > 25 && value > scrollY?.getPrevious() && scrollY?.getPrevious() > 0) {
        setHidden(true);
      }
    });

    return () => unsub();
  }, [isXs]);

  return (
    <>
      <motion.div
        variants={animateNavBar}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        className="sticky top-0 z-50 flex h-16 w-screen items-center justify-between bg-white px-5 md:h-20 lg:hidden">
        <div ref={mobileLogoRef} className="h-10 w-28 md:h-11" />
        <MenuButton setOpen={setMenuOpen} open={menuOpen} />
        <motion.div
          ref={navMenuRef}
          variants={animateNavMenu}
          initial="hidden"
          animate={menuOpen ? "visible" : "hidden"}
          className="absolute top-0 z-10 -mx-5 mt-16 w-screen overflow-hidden bg-white px-5 font-quicksand lg:hidden"
          aria-hidden={!menuOpen}>
          <motion.nav variants={animateNavChildren} className="mt-4 flex flex-col gap-6">
            {/* TODO: replace links */}
            <a href="#experience" className="w-full font-quicksand text-2xl" onClick={() => setMenuOpen(false)}>
              Experience
            </a>
            <a href="https://placeholder" className="w-full font-quicksand text-2xl" onClick={() => setMenuOpen(false)}>
              Résumé
            </a>
            <a
              href="#contact"
              className="w-max rounded-md bg-slate-500 px-4 py-2 font-quicksand text-xl text-white hover:bg-slate-400"
              onClick={() => setMenuOpen(false)}>
              Get Started
            </a>
          </motion.nav>
        </motion.div>
      </motion.div>

      <motion.div
        variants={animateNavBar}
        initial="hidden"
        animate="visible"
        className="sticky top-4 z-50 mt-4 hidden w-full items-center justify-center lg:flex">
        <nav className="relative flex h-16 w-full max-w-lg items-center justify-between overflow-hidden rounded-lg p-2 font-quicksand text-base">
          <div className="absolute left-0 top-0 h-full w-full bg-gray-100/80 backdrop-blur-md" />
          <div ref={desktopLogoRef} className="z-10 h-10 w-28" />
          <motion.a
            className="z-10 hover:text-gray-400"
            variants={animateNavChildren}
            href="#experience"
            onClick={() => setMenuOpen(false)}>
            Experience
          </motion.a>
          <motion.a className="z-10 hover:text-gray-400" variants={animateNavChildren} href="https://placeholder">
            Résumé
          </motion.a>
          <motion.a
            href="#contact"
            variants={animateNavChildren}
            className="z-10 inline-flex h-full w-max items-center rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-400"
            onClick={() => setMenuOpen(false)}>
            Get Started
          </motion.a>
        </nav>
      </motion.div>
    </>
  );
};
