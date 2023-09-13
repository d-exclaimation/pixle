"use client";

import { rc } from "@d-exclaimation/next";
import { useEffect, useState } from "react";

const IOS_PLATFORMS = ["iPhone", "iPad", "iPod"];

export default rc(() => {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const userAgentData =
      "userAgentData" in window.navigator &&
      "platform" in (window.navigator.userAgentData as any)
        ? (window.navigator.userAgentData as { platform: string })
        : undefined;
    const platform = userAgentData?.platform || window.navigator.platform;

    setIsIOS(
      IOS_PLATFORMS.includes(platform) || IOS_PLATFORMS.includes(userAgent)
    );
  }, [setIsIOS]);

  if (!isIOS) return null;

  return (
    <div className="fixed bottom-4 px-4 py-2 rounded-full flex flex-col items-center gap-2 z-0">
      <span className="text-xs text-blue-100">
        Tap{" "}
        <img src="/share.svg" className="w-4 h-4 inline-block invert mx-1" />{" "}
        and add to home screen
      </span>
      <span className="text-xs text-blue-100">
        for the best experience possible
      </span>
      <span className="text-white font-semibold animate-bounce mt-2">
        &darr;
      </span>
    </div>
  );
});
