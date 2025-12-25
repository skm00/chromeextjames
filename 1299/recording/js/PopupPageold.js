import { recordings } from "./Services/RecordingService.js";

class PopupPage extends HTMLElement {
  constructor() {
    super();
    this.btnRecord = this.querySelector(".btn-record");
    this.btnStop = this.querySelector(".btn-stop");
    this.mediaPreview = this.querySelector(".media-preview");
    this.currResult = null;
    this.btnDownload = this.querySelector(".btn-download");
    this.btnUpload = this.querySelector(".btn-upload");
    this.btnDownloadMP4 = this.querySelector(".btn-download-mp4");
    this.btnDownloadMP4Reduced = this.querySelector(".btn-download-mp4-reduced");

    this.btnRecord.addEventListener('click', () => { this.recordAsync() });
    this.btnStop.addEventListener('click', () => { this.stop() });
    this.btnDownload.addEventListener('click', () => { this.download() });
    this.btnUpload.addEventListener('click', () => { this.upload() });
    this.btnDownloadMP4.addEventListener('click', () => { this.downloadMP4() });
    this.btnDownloadMP4Reduced.addEventListener('click', () => { this.downloadMP4Reduced() });

    this.btnUpload.disabled = true;
    this.btnDownloadMP4.disabled = true;
    this.btnDownloadMP4Reduced.disabled = true;

    document.loc();
  }

  download() {
    if (this.currResult) {
      globalThis.downloadBlob(this.currResult, "recording");
    }
  }

  async downloadMP4() {
    if (this.currResult) {
      console.log("Converting to MP4...");
      try {
        const mp4Blob = await this.convertToMP4(this.currResult);
        globalThis.downloadBlob(mp4Blob, "recording.mp4");
      } catch (error) {
        console.error("MP4 conversion error:", error);
      }
    }
  }

  async convertToMP4(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const mp4Blob = new Blob([arrayBuffer], { type: 'video/mp4' });
    return mp4Blob;
  }

  async downloadMP4Reduced() {
    if (this.currResult) {
      console.log("Converting to reduced-size MP4...");
      try {
        const mp4Blob = await this.convertToReducedMP4(this.currResult);
        globalThis.downloadBlob(mp4Blob, "recording_reduced.mp4");
      } catch (error) {
        console.error("Reduced MP4 conversion error:", error);
      }
    }
  }

  async convertToReducedMP4(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const reducedArrayBuffer = arrayBuffer.slice(0, arrayBuffer.byteLength / 2);
    const mp4Blob = new Blob([reducedArrayBuffer], { type: 'video/mp4' });
    return mp4Blob;
  }

  async recordAsync() {
    console.log("Starting recording...");
    try {
      this.btnRecord.disabled = true;
      this.btnRecord.scrollIntoView();

      const recording = await recordings.startRecordingAsync({ countdown: 0, video: { type: "display" } });
      this.mediaPreview.srcObject = recordings.recordingStream;
      this.btnStop.disabled = false;

      const recordingResult = await recording.finish;
      console.log("Recording finished", recordingResult);

      if (!recordingResult?.length) throw new Error("EMPTY");

      this.currResult = new Blob(recordingResult, { type: recordingResult[0].type });

      this.mediaPreview.pause();
      this.mediaPreview.srcObject = null;
      this.mediaPreview.src = URL.createObjectURL(this.currResult);
      this.mediaPreview.controls = true;
      this.btnDownload.disabled = false;
      this.btnUpload.disabled = false;
      this.btnDownloadMP4.disabled = false;
      this.btnDownloadMP4Reduced.disabled = false;

      this.btnDownload.scrollIntoView();
    } catch (error) {
      console.error("Recording error:", error);
      this.btnRecord.disabled = false;
    }
  }

 async upload() {
    if (this.currResult) {
        console.log("Uploading video...");
        const notificationId = "video_upload_" + Date.now();
        console.log("Creating notification with ID:", notificationId);
        this.createVideoUploadNotification(notificationId, 0); // Create initial notification with 0% progress

        const formData = new FormData();
        formData.append("video", this.currResult, "video.webm");

        const url = "https://scrsht.com/touch/chrome_extn/screenshot/upload_s_video.php";

        try {
            console.log('Setting up XMLHttpRequest...');
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);

            let lastNotifiedProgress = 0;

            xhr.upload.addEventListener('loadstart', (event) => {
                console.log('Upload started', event);
            });

            xhr.upload.addEventListener('progress', (event) => {
                console.log('Progress event fired', event);
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    console.log(`Upload progress: ${percentComplete}% for notification ID: ${notificationId}`);
                   // if (percentComplete >= lastNotifiedProgress + 10 || percentComplete === 100) {
					   
					         const uploadButton = document.querySelector(".btn-upload span");
        if (uploadButton) {
            uploadButton.textContent = `Uploading... ${percentComplete}%`;
        } 
					   
					   
			            if (percentComplete % 10 === 0 || percentComplete === 100) {
		   
                        lastNotifiedProgress = percentComplete;
						
						
                        this.updateVideoUploadNotification(notificationId, percentComplete);
						
						
                    }
					
	 if (percentComplete === 100) {
            setTimeout(() => {
                if (uploadButton) {
                    uploadButton.textContent = "Upload to Server";
                }
            }, 1000); // Optional delay for better UX
        }
					
					
					
                } else {
                    console.log('Unable to compute progress information since the total size is unknown');
                }
            });

            xhr.upload.addEventListener('load', (event) => {
                console.log('Upload completed', event);
            });

            xhr.upload.addEventListener('error', (event) => {
                console.error('Upload error', event);
            });

            xhr.upload.addEventListener('abort', (event) => {
                console.error('Upload aborted', event);
            });

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const responseText = xhr.responseText;
                    console.log("Upload response:", responseText);

                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(responseText, "text/xml");

                    const status = xmlDoc.getElementsByTagName("status")[0].textContent;
                    const shareUrl = xmlDoc.getElementsByTagName("share")[0].textContent;

                    if (status === "success" && shareUrl) {
                        this.updateVideoUploadNotificationSuccess(notificationId, shareUrl);
						      window.open(shareUrl, "_blank"); // Opens in a new tab

                    } else {
                        this.updateVideoUploadNotificationFailure(notificationId);
                    }
                } else {
                    console.error('Upload error:', xhr.statusText);
                    this.updateVideoUploadNotificationFailure(notificationId);
                }
            };

            xhr.onerror = () => {
                console.error('Upload error:', xhr.statusText);
                this.updateVideoUploadNotificationFailure(notificationId);
            };

            console.log('Sending form data...');
            xhr.send(formData);

        } catch (error) {
            console.error('Upload error:', error);
            this.updateVideoUploadNotificationFailure(notificationId);
        }
    } else {
        console.log("No video to upload.");
    }
}



 createVideoUploadNotification(id, progress) {
    console.log("Creating upload notification with ID:", id, "and progress:", progress);
    chrome.runtime.sendMessage({
      type: "createNotification",
      id: id,
      options: {
        type: "progress",
        title: "Screen Recorder",
        message: `Uploading video... ${progress}%`,
        iconUrl: "/icons/icon-256.png",
        progress: progress,
        requireInteraction: true
      }
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Notification creation error:", chrome.runtime.lastError);
      } else {
        console.log("Notification creation response:", response);
      }
    });
  }

  updateVideoUploadNotification(id, progress) {
    console.log("Updating upload notification with ID:", id, "and progress:", progress);
    if (typeof progress === 'number' && !isNaN(progress)) {
      chrome.notifications.clear(id, () => {
        chrome.runtime.sendMessage({
          type: "createNotification",
          id: id,
          options: {
            type: "progress",
            title: "Screen Recorder",
            message: `Uploading video... ${progress}%`,
            iconUrl: "/icons/icon-256.png",
            progress: progress,
            requireInteraction: true
          }
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Notification update error:", chrome.runtime.lastError);
          } else {
            console.log("Notification update response:", response);
          }
        });
      });
    } else {
      console.error("Invalid progress value:", progress);
    }
  }

  updateVideoUploadNotificationSuccess(id, shareUrl) {
    console.log("Updating upload success notification with ID:", id);
    chrome.runtime.sendMessage({
      type: "updateNotification",
      id: id,
      options: {
        type: "basic",
        title: "Screen Recorder",
        message: "Video uploaded successfully",
        iconUrl: "/icons/icon-256.png"
      }
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Notification update error:", chrome.runtime.lastError);
      } else {
        console.log("Notification updated successfully");

        chrome.runtime.sendMessage({
          type: "clearNotification",
          id: id
        }, () => {
          if (chrome.runtime.lastError) {
            console.error("Notification clear error:", chrome.runtime.lastError);
          } else {
            console.log("Notification cleared successfully");
            window.location.href = shareUrl;
          }
        });
      }
    });
  }

  updateVideoUploadNotificationFailure(id) {
    console.log("Updating upload failure notification with ID:", id);
    chrome.runtime.sendMessage({
      type: "updateNotification",
      id: id,
      options: {
        type: "basic",
        title: "Screen Recorder",
        message: "Video upload failed",
        iconUrl: "/icons/icon-256.png"
      }
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Notification update error:", chrome.runtime.lastError);
      } else {
        console.log("Notification updated successfully");
      }
    });
  }





  stop() {
    console.log("Stopping recording...");
    recordings.stop();
    this.btnStop.disabled = true;
  }
}

customElements.define("popup-page", PopupPage);
