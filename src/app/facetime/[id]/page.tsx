"use client";

import { useGetCallById } from "@/app/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingRoom from "@/app/components/MeetingRoom";
import PreJoinScreen from "@/app/components/PreJoinScreen";
import { MeetingPreferencesProvider } from "@/app/providers/MeetingPreferencesContext";

export default function FaceTimePage() {
  const { id } = useParams<{ id: string }>();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [hasJoined, setHasJoined] = useState(false);

  const router = useRouter();

  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setHasJoined(true);
  };

  if (isCallLoading || !isLoaded) return <p>Loading...</p>;
  if (!call) return <p>Call not found</p>;

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      {/* ✅ StreamCall handles the call connection */}
      <StreamCall call={call}>
        {/* ✅ Preferences Provider only scoped to this call */}
        <MeetingPreferencesProvider>
          {/* ✅ StreamTheme wraps styling */}
          <StreamTheme>
            {hasJoined ? (
              <MeetingRoom />
            ) : (
              <PreJoinScreen
                onJoin={handleJoin}
                onCancel={() => router.push("/")}
              />
            )}
          </StreamTheme>
        </MeetingPreferencesProvider>
      </StreamCall>
    </main>
  );
}
