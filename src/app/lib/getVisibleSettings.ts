import { MeetingType } from "@/type/meeting";

export const getVisibleSettings = (type: MeetingType) => {
  switch (type) {
    case "1-on-1":
      return ["distortVoice", "muteOnJoin"];
    case "group":
      return ["blur", "muteOnJoin"];
    case "casual":
      return ["blur", "distortVoice"];
    default:
      return [];
  }
};
