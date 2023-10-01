"use client";

import { rc } from "@d-exclaimation/next";
import { useEffect, useState } from "react";

const TEXTMOJIS = [
  "( ͡° ͜ʖ ͡°)",
  "(⌐■_■)",
  "¯\\_(ツ)_/¯",
  "ಠ_ಠ",
  "ʢ◉ᴥ◉ʡ",
  "⤜(ʘ_ʘ)⤏",
  "ᗒ ͟ʖᗕ",
  "ლ(◕෴◕ლ)",
  "(╯⩿.⪀）╯",
  "(づʘДʘ)づ",
  "(งòᗜó)ง",
];

interface Props {
  message: string;
  size?: "small" | "medium" | "large";
}

export default rc<Props>(({ message, size }) => {
  const [emoji, setEmoji] = useState(
    TEXTMOJIS[Math.floor(Math.random() * TEXTMOJIS.length)]
  );

  useEffect(() => {
    setEmoji(TEXTMOJIS[Math.floor(Math.random() * TEXTMOJIS.length)]);
  }, [message, size]);

  return (
    <div className="flex flex-1 w-full h-full flex-col items-center justify-center gap-3">
      <span
        className="text-neutral-500 dark:text-neutral-400 font-bold text-4xl data-[size=medium]:text-6xl data-[size=large]:text-7xl"
        data-size={size ?? "medium"}
      >
        {emoji}
      </span>
      <span
        className="dark:text-white font-medium text-xs data-[size=medium]:text-base data-[size=large]:text-xl"
        data-size={size ?? "medium"}
      >
        {message}
      </span>
    </div>
  );
});
