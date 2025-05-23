"use client";

import { useGetCallById } from "@/app/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingRoom from "@/app/components/MeetingRoom";
import PreJoinScreen from "@/app/components/PreJoinScreen";
import { MeetingPreferencesProvider } from "@/app/providers/MeetingPreferencesContext";
import { useMeetingPreferences } from "@/app/providers/MeetingPreferencesContext";
import { useUserDetails } from "@/app/hooks/useUserDetails";
import { MeetingMetaData } from "@/type/preferences/MeetingPreferences";

export default function FaceTimePage() {
  const { id } = useParams<{ id: string }>();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [hasJoined, setHasJoined] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleJoin = async (metadata: MeetingMetaData) => {
    if (!call) return;
    await call.join({
      create: true, // still fine
    });

    // ✅ After joining, explicitly set your participant metadata
    await call.updateCallMembers({
      update_members: [
        {
          user_id: user?.id || "Anon",
          custom: metadata,
        },
      ],
    });

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
