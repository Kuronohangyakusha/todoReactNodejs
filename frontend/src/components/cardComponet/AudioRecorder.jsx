import React, { useRef } from "react";

export function AudioRecorder({ audioBlob, setAudioBlob, audioURL, setAudioURL }) {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimeoutRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();

      recordingTimeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          alert("Enregistrement arrêté automatiquement après 30 secondes");
        }
      }, 30000);
    } catch (err) {
      console.error("Micro non accessible :", err);
      alert("Impossible d'accéder au micro");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearTimeout(recordingTimeoutRef.current);
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
    setAudioURL(null);
    clearTimeout(recordingTimeoutRef.current);
  };

  return (
    <div>
      <label className="block text-sm font-semibold">Audio</label>
      {!audioURL ? (
        <div className="flex space-x-4">
          <button type="button" onClick={startRecording} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            🎙️ Démarrer
          </button>
          <button type="button" onClick={stopRecording} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            ⏹️ Arrêter
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <audio controls src={audioURL} />
          <button type="button" onClick={removeAudio} className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg">
            ✕ Supprimer
          </button>
        </div>
      )}
    </div>
  );
}