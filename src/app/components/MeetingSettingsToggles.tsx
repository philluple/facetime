"use client";

import {
  MeetingPreferences,
  MeetingPreferenceDisplayNames,
} from "@/type/preferences/MeetingPreferences";
import { Stack, Switch, Typography } from "@mui/material";

interface MeetingSettingsTogglesProps {
  meetingPrefs: MeetingPreferences;
  isSettingEnabled: (key: keyof MeetingPreferences) => boolean;
  toggleSetting: (key: keyof MeetingPreferences) => void;
}

export default function MeetingSettingsToggles({
  meetingPrefs,
  isSettingEnabled,
  toggleSetting,
}: MeetingSettingsTogglesProps) {
  return (
    <Stack spacing={3} className="w-full max-w-md">
      {Object.keys(meetingPrefs).map((settingKey) => (
        <div key={settingKey} className="flex items-center justify-between">
          <Typography variant="body1">
            {MeetingPreferenceDisplayNames[
              settingKey as keyof MeetingPreferences
            ] || settingKey}
          </Typography>
          <Switch
            checked={isSettingEnabled(settingKey as keyof MeetingPreferences)}
            onChange={() =>
              toggleSetting(settingKey as keyof MeetingPreferences)
            }
          />
        </div>
      ))}
    </Stack>
  );
}
