import { Icon } from "@components/Icon/Icon";
import { useRef, useState, useEffect } from "react";
import type { Swiper } from "swiper/types";

type ExperienceSlideProps = {
  index: number;
  swiper?: Swiper;
  content: string[];
  projects?: {
    content: string[];
    link: { url: string; alt: string; text: string };
    images: ImageMetadata[];
  }[];
};

export const ExperienceSlide = ({
  index,
  swiper,
  content,
  projects,
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
    swiper?.slideTo(index);
  }, [intersecting]);

  return (
    <div
      ref={ref}
      className="mb-16 flex flex-wrap justify-center gap-4 px-8 py-8 last:mb-0 md:px-16 first:lg:pt-0">
      {content.map((content) => (
        <p
          key={content[0]}
          className="w-full text-left font-quicksand text-base lg:text-lg">
          {content}
        </p>
      ))}

      {projects?.map((project) => {
        const { alt, text, url } = project.link;

        return (
          <div
            key={project.link.text}
            className="my-4 flex w-full flex-wrap justify-center">
            <a
              className="flex w-full content-center justify-center text-center font-quicksand text-base hover:underline lg:text-lg"
              alt-text={alt}
              href={url}
              target="_blank">
              {text}
              <Icon height={16} width={16} alt-text="" aria-hidden />
            </a>
            <div className="relative mb-8 h-60 w-full max-w-md">
              {project.images.map((image, index) => {
                if (index === 0) {
                  return (
                    <img
                      key={image.src}
                      className="absolute bottom-3 right-1 z-[1] h-48 lg:bottom-0"
                      src={image.src}
                      alt=""
                      aria-hidden
                    />
                  );
                } else {
                  return (
                    <img
                      key={image.src}
                      className="absolute aspect-auto"
                      src={image.src}
                      alt=""
                      aria-hidden
                    />
                  );
                }
              })}
            </div>

            {project.content?.map((content) => (
              <p
                key={content[0]}
                className="w-full text-left font-quicksand text-base lg:text-lg">
                {content}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
