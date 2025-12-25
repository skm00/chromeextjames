const UserCancelled = "USER_CANCELLED";

class RecordingService {
    #currRecorder;
    #currBuffer = [];
    #activeStreams = [];
    #recordingStream;
    #totalMs = 0;
    #lastStart;

    get isInSession() {
        return Boolean(this.#currRecorder);
    }

    get isPausing() {
        return "paused" === this.#currRecorder?.state;
    }

    get recordingStream() {
        return this.#recordingStream;
    }

    isYouTubePage() {
        const hostname = document.location.hostname;
        return hostname === "www.youtube.com" || hostname === "youtube.com";
    }

    async startRecordingAsync(e, r, t) {
        // Prevent recording on YouTube
        if (this.isYouTubePage()) {
            console.warn("Recording is not allowed on YouTube.");
            throw new Error("Recording is not allowed on YouTube.");
        }

        const stream = await this.#getRecordStreamAsync(e);
        this.#currBuffer = [];
        const recorder = (this.#currRecorder = new MediaRecorder(stream, {
            mimeType: e.codec,
        }));

        for (const track of stream.getTracks()) {
            track.addEventListener("ended", () => recorder.stop());
        }

        recorder.addEventListener("dataavailable", (event) => {
            this.#currBuffer.push(event.data);
        });

        if (e.countdown) {
            const endTime = Date.now() + e.countdown * 1000;
            while (Date.now() < endTime) {
                const remaining = endTime - Date.now();
                if (r) r(Math.max(remaining, 0));
                await this.#sleep(100);
            }
        }

        const intervalId = t
            ? setInterval(() => {
                  if (this.#lastStart) {
                      const elapsed = this.#totalMs + Date.now() - this.#lastStart;
                      t(elapsed);
                  }
              }, 50)
            : null;

        const finish = new Promise((resolve) => {
            recorder.addEventListener("stop", () => {
                this.#currRecorder = null;
                resolve(this.#currBuffer);
                if (intervalId) clearInterval(intervalId);
                this.#cleanUp();
            });
        });

        recorder.start();
        this.#lastStart = Date.now();
        return { finish };
    }

    async #getRecordStreamAsync(e) {
        // Prevent recording on YouTube
        if (this.isYouTubePage()) {
            console.warn("Recording is not allowed on YouTube.");
            throw new Error("Recording is not allowed on YouTube.");
        }

        let audioConfig = e.audio ? { deviceId: e.audio } : false;
        let stream;

        this.#activeStreams = [];

        try {
            switch (e.video.type) {
                case "display":
                    stream = await navigator.mediaDevices.getDisplayMedia({
                        video: true,
                        audio: true,
                    });

                    if (audioConfig) {
                        const audioStream = await navigator.mediaDevices.getUserMedia({
                            audio: audioConfig,
                            video: false,
                        });
                        this.#activeStreams.push(stream, audioStream);
                        stream = this.mergeTracks([stream, audioStream]);
                    }
                    break;

                case "user":
                    stream = await navigator.mediaDevices.getUserMedia({
                        audio: audioConfig,
                        video: true,
                    });
                    break;

                case "none":
                    stream = await navigator.mediaDevices.getUserMedia({
                        audio: audioConfig,
                        video: false,
                    });
                    break;

                default:
                    throw new Error("Unknown video source type.");
            }
        } catch (error) {
            throw new Error(UserCancelled);
        }

        if (stream) {
            this.#activeStreams.push(stream);
            return stream;
        }

        throw new Error(UserCancelled);
    }

    mergeTracks(streams) {
        const audioContext = new AudioContext();
        const sources = streams.map((stream) =>
            audioContext.createMediaStreamSource(stream)
        );
        const destination = audioContext.createMediaStreamDestination();

        for (const source of sources) {
            source.connect(destination);
        }

        const finalStream = new MediaStream();
        streams.forEach((stream) => {
            stream.getVideoTracks().forEach((track) => finalStream.addTrack(track));
        });

        const audioTrack = destination.stream.getAudioTracks()[0];
        if (audioTrack) finalStream.addTrack(audioTrack);

        return finalStream;
    }

    pause() {
        this.#currRecorder?.pause();
        this.#updateTotalTime();
    }

    resume() {
        this.#currRecorder?.resume();
        this.#lastStart = Date.now();
    }

    stop() {
        this.#currRecorder?.stop();
    }

    #cleanUp() {
        this.#recordingStream = null;
        for (const stream of this.#activeStreams) {
            this.#disposeStream(stream);
        }
    }

    #disposeStream(stream) {
        for (const track of stream.getTracks()) {
            track.stop();
        }
    }

    #updateTotalTime() {
        if (this.#lastStart) {
            this.#totalMs += Date.now() - this.#lastStart;
            this.#lastStart = null;
        }
    }

    #sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async reqRecordingPermAsync(audio, video) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio,
                video,
            });
            if (stream) {
                this.#disposeStream(stream);
                return true;
            }
        } catch {
            return false;
        }
    }
}

const recordings = new RecordingService();
export { UserCancelled, recordings };
