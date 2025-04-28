"use client";

import { useEffect, useState } from "react";
import { MeetingPreferences } from "@/type/preferences/MeetingPreferences";
import { MeetingType } from "@/type/meeting";

export function useMeetingPreferences(
  globalPrefs: MeetingPreferences,
  meetingType?: MeetingType
) {
  const [meetingPrefs, setMeetingPrefs] =
    useState<MeetingPreferences>(globalPrefs);

  useEffect(() => {
    // When globalPrefs loads (e.g., from Firestore), update meetingPrefs
    if (globalPrefs) {
      setMeetingPrefs(globalPrefs);
    }
  }, [globalPrefs]);

  const isSettingEnabled = (key: keyof MeetingPreferences) => {
    const setting = meetingPrefs[key];
    if (!meetingType) return false;
    if (setting === "None") return false;
    return setting.includes(meetingType);
  };

  const toggleSetting = (key: keyof MeetingPreferences) => {
    if (!meetingType) return;
    setMeetingPrefs((prev) => {
      const current = prev[key];
      if (current === "None") {
        return { ...prev, [key]: [meetingType] };
      }
      if (current.includes(meetingType)) {
        const updated = current.filter((t) => t !== meetingType);
        return { ...prev, [key]: updated.length > 0 ? updated : "None" };
      } else {
        return { ...prev, [key]: [...current, meetingType] };
      }
    });
  };

  return { meetingPrefs, isSettingEnabled, toggleSetting };
}
