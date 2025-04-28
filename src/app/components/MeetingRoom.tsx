"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaginatedGridLayout,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMeetingPreferences } from "../providers/MeetingPreferencesContext"; // ✅ use correct import
import { useInputSettings } from "../hooks/useInputSettings";
import { CustomCallLayout } from "./CustomCallLayout";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export default function MeetingRoom() {
  const [layout, _] = useState<CallLayoutType>("grid");
  const router = useRouter();
  const { meetingPrefs, isSettingEnabled } = useMeetingPreferences();

  useInputSettings(meetingPrefs, isSettingEnabled);

  const handleLeave = () => {
    confirm("Are you sure you want to leave the call?") && router.push("/");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CustomCallLayout></CustomCallLayout>
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
          <CallControls onLeave={handleLeave} />
        </div>
      </div>
    </section>
  );
}
