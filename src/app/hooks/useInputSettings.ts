import { useEffect } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { MeetingPreferences } from "@/type/preferences/MeetingPreferences";
import { applyAudioFilter } from "../lib/applyAudioDistortion";
import { useBlurFilter } from "./useBlurFilter";

export function useInputSettings(
  meetingPrefs: MeetingPreferences,
  isSettingEnabled: (key: keyof MeetingPreferences) => boolean
) {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { camera } = useCameraState();
  const { microphone, isSpeakingWhileMuted } = useMicrophoneState();

  useEffect(() => {
    if (!camera) return;

    if (isSettingEnabled("cameraOnWhenJoin")) {
      camera.enable();
    } else {
      camera.disable();
    }
  }, [camera, meetingPrefs, isSettingEnabled]);

  useEffect(() => {
    if (!microphone) return;

    if (!isSettingEnabled("muteOnJoin")) {
      microphone.enable();
    } else {
      microphone.disable();
    }

    if (isSettingEnabled("distortVoice")) {
      applyAudioFilter(microphone);
    }
  }, [camera, microphone, meetingPrefs, isSettingEnabled]);

  useEffect(() => {
    if (!microphone) return;

    if (isSettingEnabled("unmuteWhenTalking")) {
      if (isSpeakingWhileMuted) {
        microphone.enable();
      } else {
        const timer = setTimeout(() => {
          microphone.disable();
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [isSpeakingWhileMuted, microphone, isSettingEnabled]);

  useBlurFilter();
}
