import { useRef, useEffect } from "react";
import lottie, { type AnimationItem } from "lottie-web";

import hamburger from "@assets/lotties/hamburger.json";

type Props = {
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
};

export const MenuButton = ({ open, setOpen }: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuAnimationRef = useRef<AnimationItem>();

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      menuAnimationRef.current = lottie.loadAnimation({
        container: menuRef.current,
        animationData: hamburger,
        renderer: "svg",
        loop: false,
        autoplay: false,
      });

      return () => menuAnimationRef.current?.destroy();
    }
  }, []);

  useEffect(() => {
    if (open) {
      menuAnimationRef.current?.playSegments([0, 30], true);
      document.body.style.overflow = "hidden";
    } else if (open !== undefined) {
      // TODO: Unresolvable bug on iOS when scrolling from bottom of page
      menuAnimationRef.current?.playSegments([30, 0], true);
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <button ref={triggerRef} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
      <div ref={menuRef} className=" h-10 w-10 md:h-11 md:w-11" />
    </button>
  );
};
