import { useRef, useState, useEffect, type ReactNode } from "react";
import type { Swiper } from "swiper/types";

interface SwiperInstance extends HTMLElement {
  swiper?: Swiper;
}

type ExperienceSlideProps = {
  index: number;
  children: ReactNode[];
};

export const ExperienceSlide = ({ index, children }: ExperienceSlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [intersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting);
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "-50% 0% -50% 0%",
      },
    );

    observer.observe(ref.current as Element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observerOpacity = new IntersectionObserver(
      ([entry]) => {
        (entry.target as HTMLElement).style.opacity = `${Math.min(
          entry.intersectionRatio * 2,
          1,
        )}`;
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    );

    observerOpacity.observe(ref.current as Element);
    return () => observerOpacity.disconnect();
  }, []);

  useEffect(() => {
    const swiperElement = document.querySelector<SwiperInstance>(
      ".experience-carousel",
    );
    swiperElement?.swiper?.slideTo(index);
    // swiper?.slideTo(index);
  }, [intersecting]);

  return <div ref={ref}>{children}</div>;
};
