import { MeetingType } from "../meeting";

export type MeetingPreferences = {
  unmuteWhenTalking: [MeetingType] | "None";
  distortVoice: [MeetingType] | "None";
  blurVideo: [MeetingType] | "None";
  cameraOnWhenJoin: [MeetingType] | "None";
  muteOnJoin: [MeetingType] | "None";
  showBio: [MeetingType] | "None";
  showInstagram: [MeetingType] | "None";
  showGitHub: [MeetingType] | "None";
  showLinkedin: [MeetingType] | "None";
  showPronoun: [MeetingType] | "None";
};

export type MeetingSettings = {
  unmuteWhenTalking: boolean;
  distortVoice: boolean;
  blurVideo: boolean;
  cameraOnWhenJoin: boolean;
  muteOnJoin: boolean;
  showBio: boolean;
  showInstagram: boolean;
  showGitHub: boolean;
  showLinkedin: boolean;
  showPronoun: boolean;
};

export type MeetingMetaData = {
  instagram: string | null;
  github: string | null;
  linkedin: string | null;
  pronouns: string | null;
  bio: string | null;
};

export const MeetingPreferenceDisplayNames: Record<
  keyof MeetingPreferences,
  string
> = {
  unmuteWhenTalking: "Unmute When Talking",
  distortVoice: "Distort Voice",
  blurVideo: "Blur Video",
  cameraOnWhenJoin: "Camera On When Joining",
  muteOnJoin: "Mute On Join",
  showBio: "Display bio",
  showInstagram: "Display Instagram",
  showGitHub: "Display GitHub",
  showLinkedin: "Display Linkedin",
  showPronoun: "Display Pronouns",
};

export function convertPreferencesToSettings(
  preferences: MeetingPreferences,
  isSettingEnabled: (key: keyof MeetingSettings) => boolean
): MeetingSettings {
  return {
    unmuteWhenTalking: isSettingEnabled("unmuteWhenTalking"),
    distortVoice: isSettingEnabled("distortVoice"),
    blurVideo: isSettingEnabled("blurVideo"),
    cameraOnWhenJoin: isSettingEnabled("cameraOnWhenJoin"),
    muteOnJoin: isSettingEnabled("muteOnJoin"),
    showBio: isSettingEnabled("showBio"),
    showInstagram: isSettingEnabled("showInstagram"),
    showGitHub: isSettingEnabled("showGitHub"),
    showLinkedin: isSettingEnabled("showLinkedin"),
    showPronoun: isSettingEnabled("showPronoun"),
  };
}
