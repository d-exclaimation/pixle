"use client";

import { rc } from "@d-exclaimation/next";
import type { ReactNode } from "react";
import { CameraContext, useCameraProvider } from "./context";

export default rc<{ children: ReactNode }>(({ children }) => {
  const { ref } = useCameraProvider();
  return (
    <CameraContext.Provider value={{ ref }}>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        hidden
      />
      {children}
    </CameraContext.Provider>
  );
});
