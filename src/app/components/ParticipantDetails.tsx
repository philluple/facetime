import { useMeetingPreferences } from "../providers/MeetingPreferencesContext";
import { useUserDetails } from "../hooks/useUserDetails";
import { Stack } from "@mui/material";

export const ParticipantDetails = () => {
  const { isSettingEnabled } = useMeetingPreferences();
  const { details } = useUserDetails();

  const showAnySocial =
    (isSettingEnabled("showInstagram") && details.instagram) ||
    (isSettingEnabled("showLinkedin") && details.linkedin) ||
    (isSettingEnabled("showGitHub") && details.github);

  return (
    <Stack spacing={2}>
      {/* Bio section */}
      {isSettingEnabled("showBio") && details.bio && (
        <Stack spacing={0.5}>
          <p className="text-lg text-gray-600">Bio:</p>
          <p className="text-sm text-gray-600">{details.bio}</p>
        </Stack>
      )}

      {/* Socials section */}
      {showAnySocial && (
        <Stack spacing={1}>
          <p className="text-lg text-gray-600">Socials:</p>
          <Stack direction="row" spacing={2} alignItems="center">
            {isSettingEnabled("showInstagram") && details.instagram && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  width={40}
                  height={40}
                />
                <p className="text-sm text-gray-600">@{details.instagram}</p>
              </Stack>
            )}
            {isSettingEnabled("showLinkedin") && details.linkedin && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <img
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={40}
                  height={40}
                />
                <a
                  href={
                    details.linkedin.startsWith("http")
                      ? details.linkedin
                      : `https://${details.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View LinkedIn
                </a>
              </Stack>
            )}
            {isSettingEnabled("showGitHub") && details.github && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <img src="/github.svg" alt="GitHub" width={40} height={40} />
                <p className="text-sm text-gray-600">@{details.github}</p>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
