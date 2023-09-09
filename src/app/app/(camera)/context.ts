"use client";

import {
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";

export const CameraContext = createContext<{
  ref: MutableRefObject<HTMLInputElement | null>;
}>({
  ref: { current: null },
});

export function useCameraProvider() {
  const ref = useRef<HTMLInputElement | null>(null);

  return { ref };
}

export function useCamera() {
  const { ref } = useContext(CameraContext);

  const open = useCallback(() => {
    ref.current?.click();
  }, [ref]);

  return open;
}
