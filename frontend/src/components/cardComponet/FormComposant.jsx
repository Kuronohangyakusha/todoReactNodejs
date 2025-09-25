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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    setErrors({});

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
      setErrors({ general: "Erreur lors de la création de la tâche" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Créer une nouvelle tâche</h1>
              <p className="text-gray-600">Ajoutez les détails de votre tâche avec image et audio optionnels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8">
          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-medium">{errors.general}</p>
              </div>
            </div>
          )}

        <FormFields
          nom={nom}
          setNom={setNom}
          description={description}
          setDescription={setDescription}
          errors={errors}
          disabled={isSubmitting}
        />

        <ImageUpload
          image={image}
          setImage={setImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          disabled={isSubmitting}
        />

        <AudioRecorder
          audioBlob={audioBlob}
          setAudioBlob={setAudioBlob}
          audioURL={audioURL}
          setAudioURL={setAudioURL}
          disabled={isSubmitting}
        />

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="reset"
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              onClick={() => {
                setNom(""); setDescription(""); setImage(null); setImagePreview(null); setAudioBlob(null); setAudioURL(null); setErrors({});
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Effacer</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Ajouter la tâche</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
