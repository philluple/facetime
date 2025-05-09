"use client";

import React, { createContext, useContext, useState } from "react";
import { MeetingType } from "@/type/meeting";
import { MeetingPreferences } from "@/type/preferences/MeetingPreferences";
import { getDefaultMeetingPrefsFromUserPrefs } from "../lib/getDefaultMeetingPrefs";
// --- Context Value Type ---
interface MeetingPreferencesContextType {
  meetingPrefs: MeetingPreferences;
  isSettingEnabled: (key: keyof MeetingPreferences) => boolean;
  toggleSetting: (key: keyof MeetingPreferences) => void;
  initializeFromUserPrefs: (
    userPrefs: MeetingPreferences,
    meetingType?: MeetingType
  ) => void;
}

// --- Create Context ---
const MeetingPreferencesContext = createContext<
  MeetingPreferencesContextType | undefined
>(undefined);

// --- Provider ---
export function MeetingPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [meetingPrefs, setMeetingPrefs] = useState<MeetingPreferences>(
    {} as MeetingPreferences
  );

  const isSettingEnabled = (key: keyof MeetingPreferences) => {
    const setting = meetingPrefs[key];
    return setting !== "None" && Array.isArray(setting) && setting.length > 0;
  };

  const toggleSetting = (key: keyof MeetingPreferences) => {
    setMeetingPrefs((prev) => {
      const current = prev[key];
      if (current === "None") {
        return { ...prev, [key]: ["casual"] }; // You can default to ["casual"] or something else
      }
      if (Array.isArray(current)) {
        return { ...prev, [key]: current.length ? "None" : ["casual"] };
      }
      return prev;
    });
  };

  const initializeFromUserPrefs = (
    userPrefs: MeetingPreferences,
    meetingType?: MeetingType
  ) => {
    const updatedPrefs: MeetingPreferences = { ...userPrefs };

    if (meetingType) {
      for (const key in updatedPrefs) {
        if (updatedPrefs.hasOwnProperty(key)) {
          // TypeScript understands 'key' is a key of MeetingPreferences
          const setting = updatedPrefs[key as keyof MeetingPreferences];

          // Only change settings that are not 'None' and don't include the meeting type
          if (setting !== "None" && !setting.includes(meetingType)) {
            updatedPrefs[key as keyof MeetingPreferences] = "None"; // Reset the settings that don't apply to the meeting type
          }
        }
      }
    }

    setMeetingPrefs(updatedPrefs); // Update the context state with the initialized values
  };

  return (
    <MeetingPreferencesContext.Provider
      value={{
        meetingPrefs,
        isSettingEnabled,
        toggleSetting,
        initializeFromUserPrefs,
      }}
    >
      {children}
    </MeetingPreferencesContext.Provider>
  );
}

// --- Hook to use it ---
export function useMeetingPreferences() {
  const ctx = useContext(MeetingPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useMeetingPreferences must be used inside MeetingPreferencesProvider"
    );
  }
  return ctx;
}
