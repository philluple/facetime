"use client";
import VideoSettings from "./VideoSettings";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box } from "@mui/material";
const DotIcon = () => {
  return (
    <img
      src="/video-232.svg" // Reference to the SVG file in the 'public' directory
      alt="Dot Icon"
      width={20}
      height={20}
    />
  );
};

export default function UserNav() {
  return (
    <div className="flex items-center justify-end gap-5">
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.UserProfilePage
            label="Meeting Settings"
            labelIcon={<DotIcon />}
            url="video-settings"
          >
            <div>
              <Box fontWeight={"bold"}>
                <h1>Adjust Meeting Settings</h1>
              </Box>
              <VideoSettings></VideoSettings>
            </div>
          </UserButton.UserProfilePage>
        </UserButton>
      </SignedIn>
    </div>
  );
}
