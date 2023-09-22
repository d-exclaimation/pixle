"use client";

import { useSettings } from "@/app/(settings)/provider";
import { useResetMutation } from "@/lib/data/local";
import { rc } from "@d-exclaimation/next";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default rc(() => {
  const { mode, confidence, setSettings } = useSettings();
  const { isLoading: isMutationLoading, mutate } = useResetMutation();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="ml-auto flex items-center gap-1 px-2 py-1 rounded bg-white text-indigo-950 text-xs font-semibold">
          <img className="w-3 h-3" src="/menu.svg" />
          Settings
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[8rem] overflow-hidden rounded-lg border-2 border-indigo-300/10 bg-neutral-900 text-white shadow-md p-1.5 gap-0.5
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 
          data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
          data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={5}
          side="bottom"
          align="end"
        >
          <DropdownMenu.Item className="group flex text-xs text-neutral-200 select-none outline-none px-2 py-1.5 rounded hover:bg-indigo-500 hover:text-white">
            Edit Profile
            <span className="ml-auto text-neutral-200/50 group-hover:text-white">
              ⌘ E
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full h-[1px] bg-white/10 my-1" />

          {/* Game mode */}
          <DropdownMenu.Label className="px-2 text-[0.625rem] leading-tight text-white/60 py-1">
            Game Mode
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={mode}
            className="flex flex-col gap-0.5"
            onValueChange={(value) =>
              setSettings({ confidence, mode: value as any })
            }
          >
            <DropdownMenu.RadioItem
              className="flex items-center text-xs text-neutral-200 select-none outline-none px-2 py-1.5 rounded 
            hover:bg-indigo-500 hover:text-white
            data-[state=checked]:bg-indigo-500/20 data-[state=checked]:text-white"
              value="hard"
            >
              Hard
              <span className="ml-auto text-neutral-200/50 group-hover:text-white scale-90">
                6x
              </span>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="flex items-center text-xs text-neutral-200 select-none outline-none px-2 py-1.5 rounded 
            hover:bg-indigo-500 hover:text-white
            data-[state=checked]:bg-indigo-500/20 data-[state=checked]:text-white"
              value="baby"
            >
              Baby
              <span className="ml-auto text-neutral-200/50 group-hover:text-white">
                &infin;
              </span>
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator className="w-full h-[1px] bg-white/10 my-1" />

          {/* AI confident */}
          <DropdownMenu.Label className="px-2 text-[0.625rem] leading-tight text-white/60 py-1">
            ML Confidence
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={confidence}
            className="flex flex-col gap-0.5"
            onValueChange={(value) =>
              setSettings({ mode, confidence: value as any })
            }
          >
            <DropdownMenu.RadioItem
              className="flex items-center text-xs text-neutral-200 select-none outline-none px-2 py-1.5 rounded 
            hover:bg-indigo-500 hover:text-white
            data-[state=checked]:bg-indigo-500/20 data-[state=checked]:text-white"
              value="lenient"
            >
              Lenient
              <span className="ml-auto text-neutral-200/50 group-hover:text-white scale-90">
                &ge; 0.2
              </span>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="flex items-center text-xs text-neutral-200 select-none outline-none px-2 py-1.5 rounded 
            hover:bg-indigo-500 hover:text-white
            data-[state=checked]:bg-indigo-500/20 data-[state=checked]:text-white"
              value="medium"
            >
              Medium
              <span className="ml-auto text-neutral-200/50 group-hover:text-white scale-90">
                &ge; 0.4
              </span>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="flex items-center text-xs text-neutral-200 select-none outline-none px-2 py-1.5 rounded 
            hover:bg-indigo-500 hover:text-white
            data-[state=checked]:bg-indigo-500/20 data-[state=checked]:text-white"
              value="strict"
            >
              Strict{" "}
              <span className="ml-auto text-neutral-200/50 group-hover:text-white scale-90">
                &ge; 0.6
              </span>
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator className="w-full h-[1px] bg-white/10 my-1" />
          <DropdownMenu.Item
            className="group text-xs text-red-400 select-none outline-none px-2 py-1.5 rounded hover:bg-red-500 hover:text-white"
            disabled={isMutationLoading}
            onClick={() => {
              if (isMutationLoading) return;
              mutate();
            }}
          >
            Forfeit Today{" "}
            <span className="ml-4 text-neutral-200/50 group-hover:text-white">
              ⌘ ⌫
            </span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
});
