"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProviders;
