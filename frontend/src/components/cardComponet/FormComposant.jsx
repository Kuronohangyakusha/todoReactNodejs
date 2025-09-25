import React, { useState } from "react";
import useTache from "../../context/tacheContext";
import { FormFields } from "./FormFields";
import { ImageUpload } from "./ImageUpload";
import { AudioRecorder } from "./AudioRecorder";

export default function FormTache() {
  const { addTache } = useTache();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!nom.trim()) newErrors.nom = "Le nom de la tâche est obligatoire";
    if (!description.trim())
      newErrors.description = "La description est obligatoire";
    return newErrors;
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

        <FormFields
          nom={nom}
          setNom={setNom}
          description={description}
          setDescription={setDescription}
          errors={errors}
        />

        <ImageUpload
          image={image}
          setImage={setImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />

        <AudioRecorder
          audioBlob={audioBlob}
          setAudioBlob={setAudioBlob}
          audioURL={audioURL}
          setAudioURL={setAudioURL}
        />

        <div className="flex space-x-4">
          <button type="reset" className="flex-1 px-4 py-2 bg-gray-200 rounded-lg" onClick={() => {
            setNom(""); setDescription(""); setImage(null); setImagePreview(null); setAudioBlob(null); setAudioURL(null); setErrors({});
          }}>Effacer</button>
          <button type="submit" className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg">Ajouter la tâche</button>
        </div>
      </form>
    </div>
  );
}