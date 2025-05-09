import { MeetingPreferences } from "./MeetingPreferences";

const NONE = "None" as const;

export const defaultMeetingPreferences: MeetingPreferences = {
  unmuteWhenTalking: NONE,
  distortVoice: NONE,
  blurVideo: NONE,
  cameraOnWhenJoin: NONE,
  muteOnJoin: NONE,
  showBio: NONE,
  showGitHub: NONE,
  showInstagram: NONE,
  showLinkedin: NONE,
  showPronoun: NONE,
};
