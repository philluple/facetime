import { MeetingType } from "../meeting";

export type AudioPreferences = {
  distortVoice: boolean;
  safeContextOnly: boolean;
  muteOnJoin: boolean;
};

export type VideoPreferences = {
  blur: boolean;
  onlyShowIn1on1: boolean;
  verifiedRoomsOnly: boolean;
  profilePictureVisibility: "everyone" | "group" | "private";
};

export type MetadataPreferences = {
  nameVisibility: "everyone" | "group" | "private";
  pronounsVisibility: "everyone" | "group" | "private";
  showInterestsIn1on1: boolean;
};

export type MeetingPreferences = {
  unmuteWhenTalking: [MeetingType] | "None";
  distortVoice: [MeetingType] | "None";
  blurVideo: [MeetingType] | "None";
  cameraOffWhenJoin: [MeetingType] | "None";
  cameraOnWhenJoin: [MeetingType] | "None";
  pronounVisibility: [MeetingType] | "None";
  hideName: [MeetingType] | "None";
};

export type UserPreferences = {
  audio: AudioPreferences;
  video: VideoPreferences;
  metadata: MetadataPreferences;
};
