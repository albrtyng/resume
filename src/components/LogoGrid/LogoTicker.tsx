import { FunctionComponent, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { useAnimate, useInView, usePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useBreakpoint } from "@lib/hooks/useBreakpoint";

export const TICKER_DIRECTION_LEFT = -1;
export const TICKER_DIRECTION_RIGHT = 1;

type TickerProps = {
  children: JSX.Element[];
  className?: string;
  duration?: number;
  isPlaying?: boolean;
  direction?: number;
};

export const LogoTicker: FunctionComponent<TickerProps> = ({
  children,
  className = "",
  duration = 10,
  direction = TICKER_DIRECTION_LEFT,
}: TickerProps) => {
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  const tickerUUID = useRef<string>("");
  const [tickerContentWidth, setTickerContentWidth] = useState<
    number | undefined
  >(undefined);
  const [numDupes, setNumDupes] = useState<number>(1);

  const [tickerRef, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
  const isInView = useInView(tickerRef);

  const { isXs, isMd, isLg, isXl } = useBreakpoint();

  useEffect(() => {
    tickerUUID.current = uuidv4();
  }, []);

  useEffect(() => {
    let contentWidth = 0;

    for (let index = 0; index < children.length; index++) {
      const element = document.getElementById(tickerUUID.current + "_" + index)
        ?.clientWidth;
      if (element) {
        contentWidth += element;
      }
    }

    setTickerContentWidth(contentWidth);
  });

  useEffect(() => {
    if (tickerContainerRef.current && tickerContentWidth) {
      setNumDupes(
        Math.max(
          Math.ceil(
            tickerContainerRef.current.clientWidth / tickerContentWidth / 2,
          ),
          1,
        ),
      );
    }
  }, [tickerContainerRef.current, tickerContentWidth]);

  useEffect(() => {
    if (isInView) {
      animate(
        tickerRef.current,
        {
          x: tickerContentWidth
            ? direction === TICKER_DIRECTION_RIGHT
              ? [-numDupes * tickerContentWidth, 0]
              : [0, -numDupes * tickerContentWidth]
            : 0,
        },
        { ease: "linear", duration, repeat: Infinity },
      );
    } else {
      animate(tickerRef.current, {
        x: 0,
      });
    }
  }, [isInView, isXs, isMd, isLg, isXl]);

  useEffect(() => {
    if (!isPresent) {
      const animateExitRow = async () => {
        await animate(tickerRef.current, { opacity: 0 });
        safeToRemove();
      };

      animateExitRow();
    }
  }, [isPresent]);

  return (
    <div
      className={cx("w-full overflow-hidden", className)}
      ref={tickerContainerRef}>
      <div
        ref={tickerRef}
        className="border-box flex h-max w-max items-center justify-center">
        {[...Array(numDupes)].map((_) =>
          children.map((item, index) => <div key={index}>{item}</div>),
        )}

        {children.map((item, index) => (
          <div key={index} id={`${tickerUUID.current}_${index}`}>
            {item}
          </div>
        ))}

        {[...Array(numDupes)].map((_) =>
          children.map((item, index) => <div key={index}>{item}</div>),
        )}
      </div>
    </div>
  );
};
