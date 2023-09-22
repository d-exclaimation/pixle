"use client";

import { Settings as _Settings } from "@/lib/data/common";
import { useLocalSettings, useLocalSettingsMutation } from "@/lib/data/local";
import { rc } from "@d-exclaimation/next";
import { ReactNode, createContext, useContext } from "react";

export type Settings = _Settings & {
  setSettings: (settings: _Settings) => void;
};

export const SettingsContext = createContext<Settings>({
  mode: "hard",
  confidence: "lenient",
  setSettings: () => {},
});

export function useSettings() {
  const context = useContext(SettingsContext);
  return context;
}

export default rc<{ children: ReactNode }>(({ children }) => {
  const { data } = useLocalSettings();
  const { mutate } = useLocalSettingsMutation();
  return (
    <SettingsContext.Provider
      value={{
        ...(data ?? { mode: "hard", confidence: "lenient" }),
        setSettings: mutate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
});
