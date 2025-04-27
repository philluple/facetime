"use client";

import { useEffect } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

export function useVoiceDistortion(distortionEnabled: boolean) {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone } = useMicrophoneState();

  useEffect(() => {
    if (!distortionEnabled || !microphone) return;

    let unregister: (() => void) | undefined;

    unregister = microphone.registerFilter((inputMediaStream) => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(inputMediaStream);

      const distortion = audioContext.createWaveShaper();
      distortion.curve = makeDistortionCurve(400);
      distortion.oversample = "4x";

      const destination = audioContext.createMediaStreamDestination();
      source.connect(distortion);
      distortion.connect(destination);

      return {
        output: destination.stream,
        stop: () => {
          audioContext.close();
        },
      };
    }).unregister;

    return () => {
      unregister?.();
    };
  }, [distortionEnabled, microphone]);
}

function makeDistortionCurve(amount: number) {
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}
