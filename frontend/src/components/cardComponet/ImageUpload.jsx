import React from "react";

export function ImageUpload({ image, setImage, imagePreview, setImagePreview }) {
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

  return (
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
  );
}