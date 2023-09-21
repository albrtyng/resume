import { motion } from "framer-motion";

import { Icon } from "@components/Icon/Icon";

export const Social = () => {
  return (
    <div className="fixed bottom-0 left-8 z-20 hidden after:mx-auto after:block after:h-[90px] after:w-[2px] after:bg-gray-700 after:content-[''] lg:block">
      <motion.div
        className="pb-4 text-gray-700 hover:cursor-pointer hover:text-gray-400"
        whileHover={{
          y: -5,
          transition: { duration: 0.25 },
        }}>
        <a
          alt-text="Visit Albert's GitHub (Opens in new tab)"
          href="https://www.github.com/albrtyng"
          target="_blank">
          <Icon name="github" height={30} width={30} alt-text="" aria-hidden />
        </a>
      </motion.div>

      <motion.div
        className="pb-4 text-gray-700 hover:cursor-pointer hover:text-gray-400"
        whileHover={{
          y: -5,
          transition: { duration: 0.25 },
        }}>
        <a
          alt-text="Visit Albert's LinkedIn (Opens in new tab)"
          href="https://www.linkedin.com/in/albrtyng/"
          target="_blank">
          <Icon
            name="linkedin"
            height={30}
            width={30}
            alt-text=""
            aria-hidden
          />
        </a>
      </motion.div>
    </div>
  );
};
