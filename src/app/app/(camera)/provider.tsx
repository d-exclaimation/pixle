"use client";

import { resizeImage } from "@/lib/image/resize";
import { rc } from "@d-exclaimation/next";
import { useRef, useState, type ReactNode } from "react";
import { CameraContext } from "./context";

export default rc<{ children: ReactNode }>(({ children }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [photo, setPhoto] = useState<{ file: File; uri: string } | undefined>();

  return (
    <CameraContext.Provider value={{ ref, photo, setPhoto }}>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (file.size > 1024 * 1024 * 10) {
            alert("File size is too big, please try again");
            return;
          }

          const uri = await resizeImage(URL.createObjectURL(file), 400);
          setPhoto({ file, uri });
        }}
      />
      {children}
    </CameraContext.Provider>
  );
});
