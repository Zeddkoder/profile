import { ProfileFormData } from "@shared/schema";
import { useRef, useState, useEffect } from "react";

interface PhotoUploadProps {
  formData: Partial<ProfileFormData>;
  onFormUpdate: (data: Partial<ProfileFormData>) => void;
  errors: Record<string, string>;
}

const PhotoUpload = ({
  formData,
  onFormUpdate,
  errors,
}: PhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.photoUrl) {
      setPreviewUrl(formData.photoUrl);
    }
  }, [formData.photoUrl]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("La taille du fichier ne doit pas dépasser 5 Mo");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
      onFormUpdate({ photoUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Photo de profil
      </h2>

      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg mb-6">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Aperçu de la photo"
            className="mb-4 w-40 h-40 object-cover rounded-full"
          />
        ) : null}
        
        <label
          htmlFor="profile-photo"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {!previewUrl && (
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          )}
          <span className="mt-2 text-sm text-gray-600">
            {previewUrl ? "Cliquez pour changer de photo" : "Cliquez pour télécharger une photo"}
          </span>
          <span className="mt-1 text-xs text-gray-500">
            (Format recommandé: JPG, PNG - Max 5MB)
          </span>
          <input
            id="profile-photo"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default PhotoUpload;
