"use client";

import { all, item } from "@/lib/game/categories";
import type { random } from "@/lib/game/daily";
import useDevice from "@/lib/hooks/use-device";
import { Dimensions } from "@/lib/image/resize";
import { rc } from "@d-exclaimation/next";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { useCamera } from "../(camera)/context";

type Evaluation = {
  item: (typeof all)[number];
  kind: "exact" | "similar" | "none";
}[];

export default rc<ReturnType<typeof random>>(({ items }) => {
  const timeoutRef = useRef<NodeJS.Timeout | number>();
  const { device } = useDevice();
  const { photo, setPhoto } = useCamera();
  const [model, setModel] = useState<cocossd.ObjectDetection>();
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [evaluation, setEvaluation] = useState<Evaluation>([]);

  const loadModel = useCallback(async () => {
    if (model) return model;
    const newModel = await cocossd.load();
    setModel(newModel);
    return newModel;
  }, [model, setModel]);

  const evaluate = useCallback(async () => {
    if (!photo) return;

    // Create a new image element
    const img = document.createElement("img");
    img.style.display = "none";
    img.src = photo.uri;
    document.body.appendChild(img);

    const { height, width } = await new Promise<Dimensions>(
      (resolve, reject) => {
        img.onload = () => {
          const { width, height } = img;
          resolve({ width, height });
        };
        img.onerror = (e) => {
          reject(e);
        };
      }
    );

    setDimensions({ width, height });

    // Load the model and evaluate the image
    const model = await loadModel();
    const predictions = await model.detect(img);
    const given = predictions
      .map(({ class: name, bbox }) => {
        const res = item(name);
        if (!res) return undefined;
        return {
          item: res,
        };
      })
      .filter((x) => x !== undefined) as Evaluation;

    // Check if any of them are a hit (exact)
    const exacts = items.map((item) => {
      const idx = given.findIndex((each) => each.item.name === item.name);
      if (idx === -1) return undefined;
      const res = given[idx];
      given.splice(idx, 1);
      return {
        ...res,
        kind: "exact" as const,
      };
    });

    // Check if any of them are a hit (similar)
    const similars = items.map((item, i) => {
      if (exacts[i]) return undefined;
      const idx = given.findIndex(
        (each) => each.item.category === item.category
      );
      if (idx === -1) return undefined;
      const res = given[idx];
      given.splice(idx, 1);
      return {
        ...res,
        kind: "similar" as const,
      };
    });

    const result = items.map((_, i) => {
      const exact = exacts[i];
      const similar = similars[i];
      if (exact) return exact;
      if (similar) return similar;
      const res = given.pop();
      if (!res)
        return {
          item: {
            category: "none",
            name: "none",
            icon: "",
            difficulty: 0,
          },
          kind: "none" as const,
        };
      return {
        ...res,
        kind: "none" as const,
      };
    });

    img.remove();

    setEvaluation(result);
  }, [loadModel, photo, setEvaluation, setDimensions]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Drawer.Root
      open={!!photo}
      onClose={() => {
        setPhoto(undefined);
        setEvaluation([]);
        setLoading(true);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 outline-none select-none" />
        <Drawer.Content
          className="bg-neutral-800  flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 outline-none select-none"
          onOpenAutoFocus={() => {
            if (!photo || typeof window === "undefined") return;
            timeoutRef.current = setTimeout(() => {
              setLoading(true);
              evaluate().finally(() => setLoading(false));
            }, 1000);
          }}
        >
          <div className="p-4 bg-neutral-800 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-neutral-600 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-semibold mb-4 text-white text-lg">
                Evaluating photo
              </Drawer.Title>

              <div className="flex items-center justify-center w-full py-6">
                <article className="px-4 pt-4 pb-10 bg-white rounded rotate-2">
                  <img
                    className="w-72 h-72 object-cover rounded-sm"
                    src={photo?.uri}
                  />
                </article>
              </div>

              <div className="flex w-full px-6 py-3 items-center justify-center gap-3">
                {loading ? (
                  <>
                    {[0, 0.25, 0.5, 1].map((each, i) => (
                      <div
                        key={`loading-${i}`}
                        className="w-3 h-3 rounded-full mt-4 bg-neutral-400 animate-bounce [animation-fill-mode:backwards]"
                        style={{
                          animationDelay: `${each}s`,
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {evaluation
                      .filter((each) => each.item.name !== "none")
                      .map(({ item }, j) => (
                        <div
                          className={`w-12 h-12 rounded-lg bg-neutral-700 flex items-center justify-center
                          animate-in slide-in-from-bottom-3 fade-in-0 fill-mode-backwards duration-500`}
                          key={`col-${j}`}
                          style={{
                            animationDelay: `${j * 0.25}s`,
                          }}
                        >
                          <span>{item.icon}</span>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
});
