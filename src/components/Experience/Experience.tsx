import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import type { Swiper } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ExperienceSlide } from "@components/Experience/ExperienceSlide";
import { Pill } from "@components/Pill/Pill";

const slides = [
  {
    company: "Konrad Group",
    title: "Software Developer II",
    duration: "Sep 2020 - Aug 2023",
    location: "Toronto CA",
    tools: [
      "Typescript",
      "React",
      "Postgres",
      "NextJS",
      "Contentful",
      "AEM",
      "A11y",
    ],
    content: [
      "Delivered high-quality, robust production code for a diverse array of clients including Kia Canada, Cadillac Fairview, Marks & Spencer, Autozone, and more",
      "Collaborated with designers, product managers and developers to translate creative concepts into production realities for clients and stakeholders",
    ],
  },
  {
    company: "Magnet Forensics",
    title: "Software Developer Intern",
    duration: "Jan 2018 - Dec 2018, May 2019 - Aug 2019",
    location: "Ottawa, Waterloo CA",
    tools: [
      "C#",
      "MySQL",
      "Groovy",
      "Powershell",
      "React",
      "Javascript",
      "Jenkins",
      "DevOps",
    ],
    content: [
      "Maintained online dashboard to catch and manage Jenkins automation anomalies",
      "Ported existing build jobs to Jenkins pipelines, facilitating dynamic stages and parallelism",
      "Architected and implemented several UI features in Magnet Axiom, parsing Google Location History and GSuite data to be used in forensic cases",
    ],
  },
];

export const Experience = () => {
  const [swiper, setSwiper] = useState<Swiper>();

  return (
    <div className="flex w-full flex-wrap justify-center">
      <motion.p className="hidden w-full pt-10 text-center font-alphapipe text-3xl font-bold lg:block lg:text-5xl">
        Trusted by some of Canada's top companies
      </motion.p>
      <div className="flex w-full max-w-5xl flex-col-reverse justify-between lg:min-h-screen lg:flex-row lg:pt-10">
        <div className="w-full lg:w-1/2">
          {slides.map((slide, index) => (
            <ExperienceSlide index={index} swiper={swiper}>
              {slide.content.map((content) => (
                <p className="font-quicksand text-base lg:text-lg">{content}</p>
              ))}
            </ExperienceSlide>
          ))}
        </div>
        <div className="sticky top-0 w-full lg:relative lg:w-5/12">
          <motion.p className="w-full bg-white pt-8 text-center font-alphapipe text-3xl font-bold lg:hidden lg:text-5xl">
            Trusted by some of Canada's top companies
          </motion.p>
          <div className="box-border w-full lg:sticky lg:top-[37.5vh] lg:-z-10">
            <SwiperContainer
              className="flex h-64 bg-white pr-8 md:h-48 lg:h-[25vh]"
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              onSwiper={setSwiper}
              modules={[Navigation, Pagination, A11y, EffectFade]}
              direction="vertical"
              slidesPerView={1}
              pagination>
              {slides.map((slide) => (
                <SwiperSlide className="flex h-full w-full flex-wrap content-center justify-center">
                  <div className="flex w-full flex-wrap content-start gap-2 p-8 md:p-0 md:px-8 md:py-4 lg:p-2">
                    <motion.p className="w-full font-alphapipe text-3xl font-bold lg:text-4xl">
                      {slide.company}
                    </motion.p>
                    <p className="w-full font-quicksand text-lg">
                      {slide.title}
                    </p>
                    <p className="w-full font-quicksand text-lg">
                      {slide.duration}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {slide.tools.map((tool) => (
                        <Pill text={tool} />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </SwiperContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
