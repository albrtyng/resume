import { useRef, useState, useEffect } from "react";
import type { Swiper } from "swiper/types";

type ExperienceSlideProps = {
  index: number;
  swiper?: Swiper;
  children: JSX.Element[];
};

export const ExperienceSlide = ({
  index,
  swiper,
  children,
}: ExperienceSlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [intersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
    swiper?.slideTo(index);
  }, [intersecting]);

  return (
    <div
      ref={ref}
      className="mb-16 flex flex-wrap gap-4 px-8 py-16 last:mb-0 md:px-16 last:lg:pb-0">
      {children}
    </div>
  );
};
