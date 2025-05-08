"use client";

import { useGSAP } from "@gsap/react";
import { gsap, random } from "gsap";
import { ScrambleTextPlugin, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export const HeavyAdjuzt = () => {
  const textShadowTl = useRef<gsap.core.Timeline>(null);
  const textSelector = ".heavy-ajuzt";
  const { contextSafe } = useGSAP(() => {
    gsap
      .timeline()
      .to(textSelector, {
        scrambleText: {
          text: "#############",
          chars: "HEAVY_ADJUZT",
          speed: 2,
          //   rightToLeft: true,
        },
      })
      .to(textSelector, {
        scrambleText: {
          text: "HEAVY_ADJUZT",
          chars: "#############",
          speed: 5,
        },
        onComplete: nextSplit,
      });
  });

  const nextSplit = () => {
    let split = SplitText.create(".heavy-ajuzt", {
      type: "words, chars, lines",
    });

    let flickeringTl = gsap.timeline();

    const loopFlickering = (ctx: gsap.core.Timeline) => {
      for (let i = 0; i < 20; ++i) {
        ctx
          .to(split.chars, {
            opacity: "random(0,0.8)",
            stagger: {
              from: "start",
              yoyo: true,
            },
            duration: 0.03,
          })
          .set(split.chars, {
            opacity: "1",
          });
      }
    };

    loopFlickering(flickeringTl);
  };
  const mouseEnterText = contextSafe(() => {
    textShadowTl.current = gsap.timeline().to(textSelector, {
      textShadow: "-4px 4px #04d1ff, -8px 8px #22ff04",
      duration: 0.1,
    });
  });

  const mouseLeaveText = contextSafe(() => {
    textShadowTl.current && textShadowTl.current.reverse();
  });
  return (
    <>
      <div className="font-bold   w-screen h-screen flex justify-center items-center ">
        <span
          onMouseEnter={mouseEnterText}
          onMouseLeave={mouseLeaveText}
          className="heavy-ajuzt text-[35px] md:text-[100px]"
        >
          HEAVY_ADJUZT
        </span>
      </div>
    </>
  );
};
