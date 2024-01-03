import React, { useState, useEffect } from 'react';

const CustomAudioRecorder = ({ onAudioData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);

  useEffect(() => {
    let stream = null;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
      });

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      }
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    const blob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);
    setAudioPreviewUrl(audioUrl);
    setIsRecording(false);

    if (typeof onAudioData === 'function') {
      onAudioData(blob);
    }
  };

  return (
    <div>
      {audioPreviewUrl && (
        <audio controls src={audioPreviewUrl} />
      )}
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
};

export default CustomAudioRecorder;
