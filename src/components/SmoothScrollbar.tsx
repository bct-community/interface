// source: https://github.com/codebucks27/react-smooth-scroll
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

const overscrollOptions = {
  enable: true,
  effect: "bounce",
  damping: 0.15,
  maxOverscroll: 150,
};

const options = {
  syncCallbacks: true,
  damping: 0.07,
  alwaysShowTracks: true,
  plugins: {
    overscroll: { ...overscrollOptions },
  },
};

const SmoothScrollbar = () => {
  const tokenMarqueeComponent = document.getElementById(
    "token-marquee-component",
  )!;
  const navigatorComponent = document.getElementById("navigator-component")!;

  const windowHeight = window.innerHeight;
  const navigatorFixedHeight = windowHeight - 50;

  // 2 more to fix on Home (/home):
  // animations based on scroll position (AnimatedTitle, AnimatedSeparators)
  // MatrixRainingCode component

  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);

    const body = document.body;

    const scrollbar = Scrollbar.init(body, options);

    scrollbar.addListener(({ offset }) => {
      tokenMarqueeComponent.style.top = offset.y + "px";
      tokenMarqueeComponent.style.left = offset.x + "px";

      navigatorComponent.style.top = `${navigatorFixedHeight + offset.y}px`;
    });

    return () => {
      if (Scrollbar) Scrollbar.destroy(body);
    };
  }, []);

  return null;
};

export default SmoothScrollbar;
