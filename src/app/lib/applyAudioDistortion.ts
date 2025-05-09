export function applyAudioFilter(microphone: any) {
  microphone.registerFilter((inputMediaStream: MediaStream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(inputMediaStream);

    const delayNode = audioContext.createDelay();
    delayNode.delayTime.value = 0.01;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1.05;

    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.value = 300;
    biquadFilter.gain.value = 15;

    const destination = audioContext.createMediaStreamDestination();

    source.connect(delayNode);
    delayNode.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(destination);

    return {
      output: destination.stream,
      stop: () => {
        audioContext.close();
      },
    };
  });
}
