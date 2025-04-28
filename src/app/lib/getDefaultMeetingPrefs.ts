import { MeetingPreferences } from "@/type/preferences/MeetingPreferences";
import { MeetingType } from "@/type/meeting";

export function getDefaultMeetingPrefsFromUserPrefs(
  userPrefs: MeetingPreferences,
  meetingType?: MeetingType
): MeetingPreferences {
  const defaults: MeetingPreferences = {} as MeetingPreferences;

  Object.keys(userPrefs).forEach((key) => {
    const prefKey = key as keyof MeetingPreferences;
    const setting = userPrefs[prefKey];
    if (meetingType && Array.isArray(setting)) {
      defaults[prefKey] = setting.includes(meetingType)
        ? [meetingType]
        : "None";
    } else {
      defaults[prefKey] = "None";
    }
  });

  return defaults;
}
