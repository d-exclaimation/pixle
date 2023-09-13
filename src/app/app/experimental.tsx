"use client";

import { rc } from "@d-exclaimation/next";
import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";

export default rc(() => {
  const [isNewUser, setIsNewUser] = useState(false);

  const confirm = useCallback(() => {
    setIsNewUser(false);
    localStorage.setItem("pixle:user:new", "false");
  }, [setIsNewUser]);

  useEffect(() => {
    const info = localStorage.getItem("pixle:user:new");
    if (info && info === "false") return;

    const ref = setTimeout(() => setIsNewUser(true), 100);
    return () => clearTimeout(ref);
  }, [setIsNewUser]);

  return (
    <Dialog.Root open={isNewUser}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral-500/10 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 grid w-[95%] max-w-sm translate-x-[-50%] translate-y-[-50%] 
          gap-4 bg-neutral-800 p-6 duration-200 border border-amber-500/50 rounded-lg
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-1/2 
          data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 
          data-[state=closed]:slide-out-to-top-[48%]"
        >
          <Dialog.Title className="text-amber-200 m-0 text-[17px] font-medium">
            Pixle is experimental
          </Dialog.Title>
          <Dialog.Description className="text-amber-100 mt-[10px] mb-5 text-[15px] leading-normal">
            While we are excited for Pixle, this version is currently
            experimental. There will bugs, issues, and missing features. If all
            this darkness doesn't faze you, press onward, and have fun playing!
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end">
            <button
              className="bg-green-200 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              onClick={confirm}
            >
              Continue
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
