import { MemberResponse } from "@stream-io/video-client";
import { Stack } from "@mui/material";
import { MeetingMetaData } from "@/type/preferences/MeetingPreferences";

interface ParticipantDetailsProps {
  member: MemberResponse;
}

export const ParticipantDetails = ({ member }: ParticipantDetailsProps) => {
  const custom = member.custom as MeetingMetaData | undefined;

  if (!custom) {
    return null; // No custom metadata, nothing to render
  }

  return (
    <Stack spacing={2} className="p-2">
      {custom.bio && (
        <div className="text-sm text-gray-700">
          <strong>Bio:</strong> {custom.bio}
        </div>
      )}
      {custom.instagram && (
        <div className="text-sm text-gray-700">
          <strong>Instagram:</strong> @{custom.instagram}
        </div>
      )}
      {custom.linkedin && (
        <div className="text-sm text-gray-700">
          <strong>LinkedIn:</strong>{" "}
          <a
            href={`https://${custom.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {custom.linkedin}
          </a>
        </div>
      )}
      {custom.github && (
        <div className="text-sm text-gray-700">
          <strong>GitHub:</strong> @{custom.github}
        </div>
      )}
    </Stack>
  );
};
