"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaginatedGridLayout,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export default function MeetingRoom() {
  const [layout, setLayout] = useState<CallLayoutType>("grid");
  const router = useRouter();
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { camera } = useCameraState();
  const { microphone } = useMicrophoneState();

  const handleLeave = () => {
    confirm("Are you sure you want to leave the call?") && router.push("/");
  };

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
          <CallControls onLeave={handleLeave} />
        </div>
      </div>
    </section>
  );
}
