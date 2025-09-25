import React, { useState, useRef } from "react";
import useTache from "../../context/tacheContext";

export default function FormTache() {
  const { addTache } = useTache();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimeoutRef = useRef(null);  

  const validate = () => {
    const newErrors = {};
    if (!nom.trim()) newErrors.nom = "Le nom de la tâche est obligatoire";
    if (!description.trim())
      newErrors.description = "La description est obligatoire";
    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner une image valide");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille max est 5MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

 
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
      alert("Impossible d’accéder au micro");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("description", description);
      if (image) formData.append("image", image);
      if (audioBlob) formData.append("audio", audioBlob, "tache-audio.webm");

      const result = await addTache(formData);
      if (!result.success) {
        setErrors({ general: result.error });
        return;
      }

      setNom("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setAudioBlob(null);
      setAudioURL(null);
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de la création :", error.message);
      setErrors({ general: "Erreur inconnue" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold">Nom *</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.nom && <p className="text-red-500">{errors.nom}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className="mt-2 relative">
              <img src={imagePreview} alt="preview" className="max-h-40 rounded-lg" />
              <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded">
                ✕
              </button>
            </div>
          )}
        </div>

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

        <div className="flex space-x-4">
          <button type="reset" className="flex-1 px-4 py-2 bg-gray-200 rounded-lg" onClick={() => {
            setNom(""); setDescription(""); setImage(null); setImagePreview(null); removeAudio(); setErrors({});
          }}>Effacer</button>
          <button type="submit" className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg">Ajouter la tâche</button>
        </div>
      </form>
    </div>
  );
}