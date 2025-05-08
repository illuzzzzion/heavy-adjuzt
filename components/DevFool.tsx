"use client";

import devfools from "devfools";
import { useEffect } from "react";

export const DevFool = () => {
  useEffect(() => {
    devfools("all");
  }, []);
  return <></>;
};
