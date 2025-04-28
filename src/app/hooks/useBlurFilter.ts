"use client";

import { useEffect } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMeetingPreferences } from "../providers/MeetingPreferencesContext";

declare class MediaStreamTrackProcessor<T extends MediaStreamTrack> {
  readonly readable: ReadableStream<any>;
  constructor(init: { track: T });
}

declare class MediaStreamTrackGenerator<
  T extends MediaStreamTrack
> extends MediaStreamTrack {
  readonly writable: WritableStream<any>;
  constructor(init: { kind: "audio" | "video" });
}

export function useBlurFilter() {
  const { useCameraState } = useCallStateHooks();
  const { camera } = useCameraState();
  const { meetingPrefs, isSettingEnabled } = useMeetingPreferences();

  useEffect(() => {
    if (!camera) return;

    let unregisterFn: (() => void) | null = null;

    if (isSettingEnabled("blurVideo")) {
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

              ctx.filter = "blur(10px)";
              ctx.drawImage(canvas, 0, 0);

              const newFrame = new VideoFrame(canvas, {
                timestamp: frame.timestamp,
              });
              await writer.write(newFrame);
              newFrame.close();
            }
          } finally {
            frame.close();
          }

          processFrame();
        };

        processFrame();

        const output = new MediaStream([generator]);
        return {
          output,
          stop: () => {
            reader.cancel();
            writer.close();
          },
        };
      });

      unregisterFn = unregister;
    }

    return () => {
      if (unregisterFn) {
        unregisterFn();
        console.log("unregistered");

        // Wait a tick before trying to enable camera again
        setTimeout(() => {
          camera.enable();
          console.log("camera enabled after blur removed");
        }, 200); // 200ms delay is usually plenty
      }
    };
  }, [camera, meetingPrefs]);
}
