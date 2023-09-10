"use client";

import {
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
} from "react";

export type CameraContextValue = {
  ref: MutableRefObject<HTMLInputElement | null>;
  photo?: { file: File; uri: string };
  setPhoto: (photo?: { file: File; uri: string }) => void;
};

export const CameraContext = createContext<CameraContextValue>({
  ref: { current: null },
  setPhoto: () => {},
});

export function useCamera() {
  const { ref, setPhoto, photo } = useContext(CameraContext);

  const open = useCallback(() => {
    ref.current?.click();
  }, [ref]);

  return { ref, open, setPhoto, photo };
}
