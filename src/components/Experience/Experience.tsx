import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import type { Swiper } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Pill } from "@components/Pill/Pill";

import { useBreakpoint } from "@lib/hooks/useBreakpoint";
import { slides } from "@lib/constants";

export const Experience = ({ children }: { children: ReactNode[] }) => {
  const { isXs } = useBreakpoint();

  const title = "Trusted by Canada's top companies";

  return (
    <section id="experience" className="flex w-full scroll-mt-16 flex-wrap justify-center pb-8">
      <motion.p className="hidden w-full px-8 pt-10 text-center font-alphapipe font-bold [text-wrap:balance] lg:block lg:text-4xl">
        {title}
      </motion.p>
      <div className="flex w-full max-w-5xl flex-col-reverse justify-between lg:flex-row lg:px-8 lg:pt-10 xl:px-0">
        <div className="w-full lg:w-1/2">{children}</div>

        <div className="sticky top-0 z-10 w-full lg:relative lg:w-5/12">
          <motion.p className="w-full bg-white px-8 pb-2 pt-4 text-center font-alphapipe text-3xl font-bold [text-wrap:balance] lg:hidden lg:text-5xl">
            {title}
          </motion.p>
          <div className="box-border w-full shadow-sm lg:sticky lg:top-[37.5vh] lg:-z-10 lg:shadow-none">
            <SwiperContainer
              className="experience-carousel flex max-h-[124px] bg-white pr-8 md:h-48 md:max-h-[200px] lg:h-[25vh]"
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              height={isXs ? 124 : null}
              modules={[Navigation, Pagination, A11y, EffectFade]}
              direction="vertical"
              slidesPerView={1}
              allowTouchMove={false}
              pagination>
              {slides.map((slide) => (
                <SwiperSlide
                  key={slide.company}
                  className="flex h-full w-full flex-wrap content-center justify-center">
                  <div className="flex w-full flex-wrap content-start gap-2 px-8  py-4 md:px-16 md:py-4 lg:p-2">
                    <motion.p className="w-full font-quicksand text-xl font-bold lg:text-2xl">
                      {slide.company}
                    </motion.p>
                    <p className="w-full font-quicksand text-base lg:text-lg">{slide.title}</p>
                    <p className="w-full font-quicksand text-base lg:text-lg">{slide.duration}</p>
                    <div className="hidden h-[68px] flex-wrap gap-1 overflow-scroll md:flex lg:[height:none] lg:[overflow:unset]">
                      {slide.tools.map((tool) => (
                        <Pill key={tool} text={tool} />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </SwiperContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
