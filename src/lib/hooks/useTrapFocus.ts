import { getFocusableElements } from "@lib/utils";
import { RefObject, useEffect } from "react";

export const useFocusTrap = (
  ref: RefObject<HTMLElement>,
  options: {
    isActive?: boolean;
  },
) => {
  let { isActive = false } = options;

  useEffect(() => {
    if (ref && ref.current && isActive) {
      const focusableElements = getFocusableElements(ref.current);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() !== "tab") {
          return;
        }

        const lastElement = focusableElements[focusableElements.length - 1];
        const firstElement = focusableElements[0];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [ref, isActive]);
};
