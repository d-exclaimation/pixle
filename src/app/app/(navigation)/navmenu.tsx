"use client";

import { rc } from "@d-exclaimation/next";
import Link from "next/link";
import { useCamera } from "../(camera)/context";

export default rc(() => {
  const snap = useCamera();
  return (
    <nav className="fixed bottom-5 bg-white/60 backdrop-blur-xl px-3 py-1 rounded-full flex items-center gap-4 z-[100]">
      <Link
        className="w-10 h-10 p-2 rounded-full hover:bg-white/40"
        href="/app"
      >
        <img src="/home.svg" />
      </Link>
      <button className="w-10 h-10 p-2 rounded-full bg-black" onClick={snap}>
        <img src="/snap.svg" />
      </button>
      <Link
        className="w-10 h-10 p-2 rounded-full hover:bg-white/40"
        href="/app/profile"
      >
        <img
          className="rounded-full outline outline-white"
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Coco"
        />
      </Link>
    </nav>
  );
});
