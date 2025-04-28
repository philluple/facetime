import { useCallStateHooks, ParticipantView } from "@stream-io/video-react-sdk";
import { ParticipantDetails } from "./ParticipantDetails";
import { Box, Stack } from "@mui/material";

export const CustomCallLayout = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {participants.map((participant) => (
        <Box
          key={participant.sessionId}
          className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white"
          style={{ minWidth: 300, maxWidth: 500, flex: "1 1 300px" }}
        >
          <Box className="bg-black" style={{ aspectRatio: "16 / 9" }}>
            <ParticipantView participant={participant} />
          </Box>

          <Box className="p-4">
            <ParticipantDetails />
          </Box>
        </Box>
      ))}
    </div>
  );
};
