import { useCallStateHooks, ParticipantView } from "@stream-io/video-react-sdk";
import { ParticipantDetails } from "./ParticipantDetails";
import { Box } from "@mui/material";
import { MeetingMetaData } from "@/type/preferences/MeetingPreferences";

export const CustomCallLayout = () => {
  const { useParticipants, useCallMembers } = useCallStateHooks();
  const participants = useParticipants();
  const members = useCallMembers();

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {participants.map((participant) => {
        const member = members.find((m) => m.user_id === participant.userId);
        const metdata = member?.custom as MeetingMetaData | undefined;
        return (
          <Box
            key={participant.sessionId}
            className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white"
            style={{ minWidth: 300, maxWidth: 500, flex: "1 1 300px" }}
          >
            <Box className="bg-black" style={{ aspectRatio: "16 / 9" }}>
              <ParticipantView participant={participant} />
            </Box>
            {member && (
              <ParticipantDetails uid={member.user_id} metadata={metdata} />
            )}
          </Box>
        );
      })}
    </div>
  );
};
