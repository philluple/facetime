"use client";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingRoom from "./MeetingRoom";

export default function CallShell({ call }: { call: any }) {
  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingRoom />
      </StreamTheme>
    </StreamCall>
  );
}
