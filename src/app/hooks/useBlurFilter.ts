"use client";

import { useEffect } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMeetingPreferences } from "../providers/MeetingPreferencesContext";

export function useBlurFilter() {
  const { useCameraState } = useCallStateHooks();
  const { camera } = useCameraState();
  const { meetingPrefs, isSettingEnabled } = useMeetingPreferences(); // ✅ Grab meeting preferences from context
  useEffect(() => {
    if (!camera || !isSettingEnabled("blurVideo")) return;

    const { unregister } = camera.registerFilter(function blurVideoFilter(
      inputStream: MediaStream
    ) {
      const videoTrack = inputStream.getVideoTracks()[0];
      const processor = new MediaStreamTrackProcessor({ track: videoTrack });
      const generator = new MediaStreamTrackGenerator({ kind: "video" });

      const reader = processor.readable.getReader();
      const writer = generator.writable.getWriter();

      const processFrame = async () => {
        const { value: frame, done } = await reader.read();
        if (done || !frame) {
          return;
        }

        try {
          const canvas = new OffscreenCanvas(
            frame.displayWidth,
            frame.displayHeight
          );
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(frame, 0, 0);

            // Apply blur effect
            ctx.filter = "blur(10px)"; // You can adjust the blur intensity here
            ctx.drawImage(canvas, 0, 0);

            const newFrame = new VideoFrame(canvas, {
              timestamp: frame.timestamp,
            });
            await writer.write(newFrame);
            newFrame.close();
          }
        } finally {
          frame.close(); // Always close the input frame!
        }

        processFrame(); // Continue processing
      };

      processFrame(); // Start processing frames

      const output = new MediaStream([generator]);
      return {
        output,
        stop: () => {
          reader.cancel();
          writer.close();
        },
      };
    });

    return () => {
      unregister();
    };
  }, [camera, meetingPrefs]);
}
