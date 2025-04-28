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
