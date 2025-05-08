"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP((ctx, contextSafe) => {
    if (!contextSafe) {
      return;
    }
    document.body.style.cursor = "none";
    const updatePosition = contextSafe((e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        opacity: 1,
      });

      const arrElPointer = ["a", "button"];

      const localNameTagHTML = (e.target as HTMLDivElement).localName;

      if (arrElPointer.includes(localNameTagHTML)) {
        cursorRef.current!.classList.add("pointer");
      } else {
        cursorRef.current!.classList.remove("pointer");
      }
    });

    window.addEventListener("mousemove", updatePosition);

    const outSidePage = contextSafe((e: MouseEvent) => {
      gsap.set(cursorRef.current, {
        opacity: 0,
      });
    });

    document.addEventListener("mouseout", outSidePage);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseout", outSidePage);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 w-[50px] h-[50px] bg-cover bg-center bg-no-repeat select-none pointer-events-none -translate-x-[50%] -translate-y-[50%] opacity-0"
    />
  );
};
