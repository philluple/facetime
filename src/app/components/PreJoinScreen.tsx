"use client";

import { VideoPreview, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Stack, Typography, Switch } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useVoiceDistortion } from "../hooks/useDistortedMicrophone";
import { UserPreferences } from "@/type/preferences/UserPreferences";
import { useUserPreferences } from "../hooks/userUserPreferences";
import PreferencesForm from "./PreferencesForm";
import { getVisibleSettings } from "../lib/getVisibleSettings";
import { MeetingType } from "@/type/meeting";
import { useCall } from "@stream-io/video-react-sdk";
interface PreJoinScreenProps {
  onJoin: () => void;
  onCancel: () => void;
}

export default function PreJoinScreen({
  onJoin,
  onCancel,
}: PreJoinScreenProps) {
  const { useCameraState, useMicrophoneState, useCallCustomData } =
    useCallStateHooks();
  const { camera, mediaStream } = useCameraState();
  const { microphone } = useMicrophoneState();
  const { user } = useUser();
  const [showPreview, setShowPreview] = useState(true);
  const [distortionEnabled, setDistortionEnabled] = useState(false);
  const { prefs: globalPrefs } = useUserPreferences();

  const custom = useCallCustomData();
  const meetingType = custom?.meetingType as MeetingType | undefined;
  const visibleSettings = meetingType ? getVisibleSettings(meetingType) : [];

  const [meetingPrefs, setMeetingPrefs] =
    useState<UserPreferences>(globalPrefs);

  // 🔥 Distort voice if enabled
  useVoiceDistortion(distortionEnabled);

  useEffect(() => {
    async function enableDevices() {
      if (camera && microphone) {
        await camera.enable();
        await microphone.enable();
      }
    }
    enableDevices();
  }, [camera, microphone]);

  const handleMeetingChange = (
    section: keyof UserPreferences,
    key: string,
    value: any
  ) => {
    setMeetingPrefs((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      className="min-h-screen p-6"
    >
      {/* ✨ Welcome Title */}
      <Typography variant="h4" fontWeight="bold" color="primary">
        Looking good, {user?.firstName}!
      </Typography>

      {/* ✨ Preview Toggle */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="textSecondary">
          {showPreview ? "Camera Preview On" : "Camera Preview Off"}
        </Typography>
        <Switch
          checked={showPreview}
          onChange={() => setShowPreview((prev) => !prev)}
          color="success"
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="textSecondary">
          {distortionEnabled ? "Voice Distortion On" : "Voice Distortion Off"}
        </Typography>
        <Switch
          checked={distortionEnabled}
          onChange={() => setDistortionEnabled((prev) => !prev)}
          color="secondary"
        />
      </Stack>

      {showPreview ? (
        <VideoPreview className="w-full h-full object-cover rounded-md shadow-lg max-w-[500px] max-h-[400px]" />
      ) : (
        <Typography variant="body1" color="textSecondary">
          Camera preview is off
        </Typography>
      )}

      {visibleSettings.includes("distortVoice") && (
        <label className="block py-2">
          <input
            type="checkbox"
            checked={meetingPrefs.audio.distortVoice}
            onChange={(e) =>
              handleMeetingChange("audio", "distortVoice", e.target.checked)
            }
          />{" "}
          Distort Voice
        </label>
      )}

      {visibleSettings.includes("blur") && (
        <label className="block py-2">
          <input
            type="checkbox"
            checked={meetingPrefs.video.blur}
            onChange={(e) =>
              handleMeetingChange("video", "blur", e.target.checked)
            }
          />{" "}
          Blur Background
        </label>
      )}

      {/* ✨ Join Buttons */}
      <div className="flex gap-5 mt-5">
        <button
          onClick={onJoin}
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
