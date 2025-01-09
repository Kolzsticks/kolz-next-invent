"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#0EA5E9"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProviders;
