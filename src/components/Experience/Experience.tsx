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

import kiaMobile from "@assets/images/kia-mobile.png";
import kiaDesktop from "@assets/images/kia-desktop.png";
import cfMobile from "@assets/images/cf-mobile.png";
import cfDesktop from "@assets/images/cf-desktop.png";
import { useBreakpoint } from "@lib/hooks/useBreakpoint";

const slides = [
  {
    company: "Konrad Group",
    title: "Software Developer II, I, Associate",
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
      "Tested and resolved accessibility issues on all projects, reaching WCAG 2.0+ AA compliancy across the board",
    ],
    projects: [
      {
        content: [
          "Kia Canada was one of Albert's first major projects at Konrad. He collaborated with other developers and designers to build several AEM compatible components, such as the Vehicle Hero Banner, Trim Compare Carousel and Vehicle360.",
        ],
        link: {
          url: "https://www.kia.ca/",
          alt: "Visit kia.ca (Opens in new tab)",
          text: "kia.ca",
        },
        images: [kiaMobile, kiaDesktop],
      },
      {
        content: [
          "On Cadillac Fairview, Albert was not only assigned to the original site build, but he was also the sole developer on the site's accessibility revamp a year later. With Albert's quickness and accessibility know-how, Cadillac Fairview was able to reach AA compliancy within 2 months.",
        ],
        link: {
          url: "https://www.shops.cadillacfairview.com/",
          alt: "Visit shops.cadillacfairview.com (Opens in new tab)",
          text: "shops.cadillacfairview.com",
        },
        images: [cfMobile, cfDesktop],
      },
    ],
  },
  {
    company: "Magnet Forensics",
    title: "Software Developer Intern",
    duration: "2018, May 2019 - Aug 2019",
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
  const { isXs } = useBreakpoint();

  return (
    <section
      id="experience"
      className="flex w-full scroll-mt-16 flex-wrap justify-center pb-8">
      <motion.p className="hidden w-full px-8 pt-10 text-center font-alphapipe font-bold [text-wrap:balance] lg:block lg:text-4xl">
        Trusted by some of Canada's top companies
      </motion.p>
      <div className="flex w-full max-w-5xl flex-col-reverse justify-between lg:flex-row lg:px-8 lg:pt-10 xl:px-0">
        <div className="w-full lg:w-1/2">
          {slides.map((slide, index) => (
            <ExperienceSlide
              key={slide.company}
              index={index}
              swiper={swiper}
              content={slide.content}
              projects={slide.projects}
            />
          ))}
        </div>
        <div className="sticky top-0 z-10 w-full lg:relative lg:w-5/12">
          <motion.p className="w-full bg-white px-8 pb-4 pt-8 text-center font-alphapipe text-3xl font-bold [text-wrap:balance] lg:hidden lg:text-5xl">
            Trusted by Canada's top companies
          </motion.p>
          <div className="box-border w-full shadow-sm lg:sticky lg:top-[37.5vh] lg:-z-10 lg:shadow-none">
            <SwiperContainer
              className="flex max-h-[200px] bg-white pr-8 md:h-48 lg:h-[25vh]"
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              height={isXs ? 200 : null}
              onSwiper={setSwiper}
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
                    <p className="w-full font-quicksand text-base lg:text-lg">
                      {slide.title}
                    </p>
                    <p className="w-full font-quicksand text-base lg:text-lg">
                      {slide.duration}
                    </p>
                    <div className="flex h-[68px] flex-wrap gap-1 overflow-scroll lg:[height:none] lg:[overflow:unset]">
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
