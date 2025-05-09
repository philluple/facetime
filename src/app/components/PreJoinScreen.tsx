"use client";

import { VideoPreview, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Stack, Typography, Switch } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useUserPreferences } from "../hooks/userUserPreferences";
import { MeetingType } from "@/type/meeting";
import { useMeetingPreferences } from "../providers/MeetingPreferencesContext"; // ✅ updated
import { useState, useEffect } from "react";
import MeetingSettingsToggles from "./MeetingSettingsToggles";
import { MeetingMetaData } from "@/type/preferences/MeetingPreferences";
import { useUserDetails } from "../hooks/useUserDetails";
interface PreJoinScreenProps {
  onJoin: (metadata: MeetingMetaData) => void;
  onCancel: () => void;
}

export default function PreJoinScreen({
  onJoin,
  onCancel,
}: PreJoinScreenProps) {
  const { useCameraState, useMicrophoneState, useCallCustomData } =
    useCallStateHooks();
  const { camera } = useCameraState();
  const { microphone } = useMicrophoneState();
  const { user } = useUser();
  const { prefs, loading } = useUserPreferences(); // ✅ fetch global prefs
  const {
    initializeFromUserPrefs,
    meetingPrefs,
    isSettingEnabled,
    toggleSetting,
  } = useMeetingPreferences(); // ✅ no arguments now
  const [showPreview, setShowPreview] = useState(true);
  const { details } = useUserDetails();
  const custom = useCallCustomData();
  const meetingType = custom?.meetingType as MeetingType | undefined;

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && !loading && prefs && meetingType) {
      initializeFromUserPrefs(prefs, meetingType);
      setHasInitialized(true); // ✅ only once
    }
  }, [prefs, meetingType, loading, hasInitialized, initializeFromUserPrefs]);

  useEffect(() => {
    async function enableDevices() {
      if (camera && microphone) {
        await camera.enable();
        await microphone.enable();
      }
    }
    enableDevices();
  }, [camera, microphone]);

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      className="min-h-screen p-6"
    >
      <Typography variant="h4" fontWeight="bold" color="primary">
        Looking good, {user?.firstName}!
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2">
          {showPreview ? "Camera Preview On" : "Camera Preview Off"}
        </Typography>
        <Switch
          checked={showPreview}
          onChange={() => setShowPreview((prev) => !prev)}
        />
      </Stack>

      {showPreview ? (
        <VideoPreview className="w-full h-full object-cover rounded-md shadow-lg max-w-[500px] max-h-[400px]" />
      ) : (
        <Typography>Camera preview is off</Typography>
      )}

      {/* Meeting Settings */}
      <MeetingSettingsToggles
        meetingPrefs={meetingPrefs}
        isSettingEnabled={isSettingEnabled}
        toggleSetting={toggleSetting}
      />

      {/* Join Buttons */}
      <div className="flex gap-5 mt-5">
        <button
          onClick={() => {
            const metadata: MeetingMetaData = {
              instagram:
                isSettingEnabled("showInstagram") && details.instagram
                  ? details.instagram
                  : null,
              linkedin:
                isSettingEnabled("showLinkedin") && details.linkedin
                  ? details.linkedin
                  : null,
              pronouns:
                isSettingEnabled("showPronoun") && details.pronouns
                  ? details.pronouns
                  : null,
              github:
                isSettingEnabled("showGitHub") && details.github
                  ? details.github
                  : null,
              bio:
                isSettingEnabled("showBio") && details.bio ? details.bio : null,
            };
            onJoin(metadata);
          }}
          className="px-4 py-3 bg-green-600 text-green-50 rounded"
        >
          Join
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-red-600 text-red-50 rounded"
        >
          Cancel
        </button>
      </div>
    </Stack>
  );
}
