import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { MeetingMetaData } from "@/type/preferences/MeetingPreferences";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { FaCog } from "react-icons/fa";
import { useState } from "react";
import { useUserDetails } from "../hooks/useUserDetails";
import { useParams } from "next/navigation";
import { useGetCallById } from "@/app/hooks/useGetCallById";
import { useMeetingPreferences } from "../providers/MeetingPreferencesContext";

interface ParticipantDetailsProps {
  metadata?: MeetingMetaData;
  uid?: string;
}

export const ParticipantDetails = ({
  metadata,
  uid,
}: ParticipantDetailsProps) => {
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const { details } = useUserDetails();
  const { id } = useParams<{ id: string }>();
  const { call } = useGetCallById(id);

  const [localMetadata, setLocalMetadata] = useState(metadata);
  const [isEditing, setIsEditing] = useState(false); // 🚀 Dialog open/close

  const { isSettingEnabled, toggleSetting } = useMeetingPreferences();
  if (!metadata) return null;

  const isLocalUser = localParticipant?.userId === uid;

  const handleCheckboxChange = (key: keyof MeetingMetaData) => {
    setLocalMetadata((prev) => {
      if (!prev) return prev;
      const currentValue = prev[key];
      if (currentValue) {
        return { ...prev, [key]: null };
      } else {
        return { ...prev, [key]: details[key] || "" };
      }
    });
  };

  const handleSave = async () => {
    if (!localMetadata || !call || !localParticipant?.userId) return;

    await call.updateCallMembers({
      update_members: [
        {
          user_id: localParticipant.userId,
          custom: localMetadata,
        },
      ],
    });

    setIsEditing(false); // close dialog after saving
  };

  return (
    <Stack className="relative p-2 min-h-[10px]">
      {isLocalUser && (
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full hover:bg-gray-600 flex items-center justify-center"
          onClick={() => setIsEditing(true)}
        >
          <FaCog />
        </button>
      )}

      {/* Normal participant details */}
      {metadata.bio && (
        <div className="text-sm text-gray-700">
          <strong>Bio:</strong>
          <p>{metadata.bio}</p>
        </div>
      )}
      {metadata.instagram && (
        <div className="text-sm text-gray-700">
          <strong>Instagram:</strong> @{metadata.instagram}
        </div>
      )}
      {metadata.linkedin && (
        <div className="text-sm text-gray-700">
          <strong>LinkedIn:</strong>{" "}
          <a
            href={`https://linkedin.com/in/${metadata.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            {metadata.linkedin}
          </a>
        </div>
      )}
      {metadata.github && (
        <div className="text-sm text-gray-700">
          <strong>GitHub:</strong> @{metadata.github}
        </div>
      )}

      {/* Settings Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit What You Share</DialogTitle>
        <DialogContent dividers>
          <label
            key={"Blur video"}
            className="flex items-center space-x-2 mb-2"
          >
            <input
              type="checkbox"
              checked={isSettingEnabled("blurVideo")}
              onChange={() => toggleSetting("blurVideo")}
            />
            <span className="capitalize">Blur Video</span>
          </label>
          <label
            key={"Distored voice"}
            className="flex items-center space-x-2 mb-2"
          >
            <input
              type="checkbox"
              checked={isSettingEnabled("distortVoice")}
              onChange={() => toggleSetting("distortVoice")}
            />
            <span className="capitalize">Distort Voice</span>
          </label>

          {Object.keys(metadata).map((key) => {
            const fieldKey = key as keyof MeetingMetaData;
            return (
              <label key={key} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={!!localMetadata?.[fieldKey]}
                  onChange={() => handleCheckboxChange(fieldKey)}
                />
                <span className="capitalize">{fieldKey}</span>
              </label>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
