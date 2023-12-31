"use client";

import { rc } from "@d-exclaimation/next";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useCamera } from "../(camera)/context";
import Link from "./adaptive-link";

export default rc(() => {
  const { open } = useCamera();
  const searchParams = useSearchParams();

  const isStandalone = useMemo(
    () => !!searchParams.get("standalone"),
    [searchParams]
  );

  return (
    <nav
      className="fixed bottom-6 dark:bg-black/60 bg-white/60 z-50 overflow-visible group 
      backdrop-blur-xl  px-3 py-1 rounded-full flex items-center justify-center gap-6
      data-[standalone]:bottom-0 data-[standalone]:w-screen 
      data-[standalone]:bg-neutral-300 dark:data-[standalone]:bg-neutral-800
      data-[standalone]:pt-2.5 data-[standalone]:pb-6 data-[standalone]:rounded-none data-[standalone]:gap-10"
      data-standalone={isStandalone ? "true" : undefined}
    >
      <Link
        className="w-12 h-12 p-2 rounded-full group-data-[standalone]:hover:bg-black/10 dark:group-data-[standalone]:hover:bg-white/10 hover:bg-sky-200/40"
        href={isStandalone ? "/app?standalone=true" : "/app"}
      >
        <img
          className="dark:group-data-[standalone]:invert dark:invert"
          src="/home.svg"
        />
      </Link>
      <button
        className="bg-black dark:bg-white w-12 h-12 p-2 rounded-full
        group-data-[standalone]:w-14 group-data-[standalone]:h-14
        dark:group-data-[standalone]:bg-white group-data-[standalone]:-translate-y-2"
        onClick={open}
      >
        <img
          className="dark:group-data-[standalone]:invert dark:invert"
          src="/snap.svg"
        />
      </button>
      <Link
        className="w-12 h-12 p-2 rounded-full group-data-[standalone]:hover:bg-black/10 dark:group-data-[standalone]:hover:bg-white/10 hover:bg-sky-200/40"
        href={isStandalone ? "/app/profile?standalone=true" : "/app/profile"}
      >
        <img
          className="rounded-full border border-black dark:border-white"
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Coco"
        />
      </Link>
    </nav>
  );
});
