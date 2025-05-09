"use client";
import { useState, useEffect } from "react";
import { FaLink, FaVideo } from "react-icons/fa";
import Image from "next/image";
import InstantMeeting from "@/app/modals/InstantMeeting";
import UpcomingMeeting from "@/app/modals/UpcomingMeeting";
import CreateLink from "@/app/modals/CreateLink";
import JoinMeeting from "@/app/modals/JoinMeeting";
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk"; // <-- new import

export default function Dashboard() {
  const [joinMeeting, setJoinMeeting] = useState<boolean>(false);
  const [showUpcomingMeetings, setShowUpcomingMeetings] =
    useState<boolean>(false);
  const [showCreateLink, setShowCreateLink] = useState<boolean>(false);
  const [startInstantMeeting, setStartInstantMeeting] =
    useState<boolean>(false);
  const [call, setCall] = useState<Call | null>(null); // <-- new state
  const client = useStreamVideoClient(); // <-- needed to create the call

  useEffect(() => {
    if (startInstantMeeting && client && !call) {
      const id = crypto.randomUUID();
      const newCall = client.call("default", id);
      setCall(newCall); // <-- create the call as soon as modal opens
    }
  }, [startInstantMeeting, client, call]);

  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl text-center">FaceTime</h1>
        <div className="flex flex-col">
          <button
            className="text-green-500 underline text-sm text-center cursor-pointer"
            onClick={() => setShowUpcomingMeetings(true)}
          >
            Upcoming FaceTime
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            className="bg-gray-500 px-4 w-[200px] py-3 flex flex-col items-center hover:bg-gray-600 text-white rounded-md shadow-sm"
            onClick={() => setShowCreateLink(true)}
          >
            <FaLink className="mb-[3px] text-gray-300" />
            Create link
          </button>
          <button
            className="bg-green-500 px-4 w-[200px] hover:bg-green-600 py-3 flex flex-col items-center text-white rounded-md shadow-sm"
            onClick={() => setStartInstantMeeting(true)}
          >
            <FaVideo className="mb-[3px] text-white" />
            New FaceTime
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <p className="text-sm text-gray-600 mr-2">Powered by</p>
          <a
            href="https://getstream.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src="/stream-logo.png"
              alt="Stream Logo"
              width={80}
              height={20}
            />
          </a>
        </div>
      </main>

      {startInstantMeeting && call && (
        <InstantMeeting
          enable={startInstantMeeting}
          setEnable={setStartInstantMeeting}
          call={call} // <-- pass the created call down
        />
      )}
      {showUpcomingMeetings && (
        <UpcomingMeeting
          enable={showUpcomingMeetings}
          setEnable={setShowUpcomingMeetings}
        />
      )}
      {showCreateLink && (
        <CreateLink enable={showCreateLink} setEnable={setShowCreateLink} />
      )}
    </>
  );
}
