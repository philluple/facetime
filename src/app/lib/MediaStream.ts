export interface MediaStreamTrackGeneratorOptions {
  kind: "audio" | "video";
}

export interface MediaStreamTrackGenerator extends MediaStreamTrack {
  writable: WritableStream<VideoFrame>;
}

export declare var MediaStreamTrackGenerator: {
  prototype: MediaStreamTrackGenerator;
  new (options: MediaStreamTrackGeneratorOptions): MediaStreamTrackGenerator;
};

export interface MediaStreamTrackProcessorOptions {
  track: MediaStreamTrack;
}

export interface MediaStreamTrackProcessor<T = VideoFrame> {
  readonly readable: ReadableStream<T>;
}

export declare var MediaStreamTrackProcessor: {
  prototype: MediaStreamTrackProcessor;
  new (options: MediaStreamTrackProcessorOptions): MediaStreamTrackProcessor;
};
