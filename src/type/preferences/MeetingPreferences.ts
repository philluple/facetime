import { MeetingType } from "../meeting";

export type MeetingPreferences = {
  unmuteWhenTalking: [MeetingType] | "None";
  distortVoice: [MeetingType] | "None";
  blurVideo: [MeetingType] | "None";
  cameraOnWhenJoin: [MeetingType] | "None";
  hideName: [MeetingType] | "None";
  muteOnJoin: [MeetingType] | "None";
};

export const MeetingPreferenceDisplayNames: Record<
  keyof MeetingPreferences,
  string
> = {
  unmuteWhenTalking: "Unmute When Talking",
  distortVoice: "Distort Voice",
  blurVideo: "Blur Video",
  cameraOnWhenJoin: "Camera On When Joining",
  hideName: "Hide Name",
  muteOnJoin: "Mute On Join",
};
