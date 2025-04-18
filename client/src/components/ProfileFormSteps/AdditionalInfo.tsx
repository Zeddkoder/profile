import { ProfileFormData } from "@shared/schema";

interface AdditionalInfoProps {
  formData: Partial<ProfileFormData>;
  onFormUpdate: (data: Partial<ProfileFormData>) => void;
  errors: Record<string, string>;
}

const AdditionalInfo = ({
  formData,
  onFormUpdate,
  errors,
}: AdditionalInfoProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Informations complémentaires
      </h2>

      <div className="mb-4">
        <label
          htmlFor="specialization"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          10. Souhaites-tu te spécialiser ou évoluer vers un autre domaine?
        </label>
        <textarea
          id="specialization"
          value={formData.specialization || ""}
          onChange={(e) => onFormUpdate({ specialization: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="portfolio"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          11. As-tu un portfolio ou un site web personnel?
        </label>
        <input
          type="url"
          id="portfolio"
          value={formData.portfolio || ""}
          onChange={(e) => onFormUpdate({ portfolio: e.target.value })}
          placeholder="Ex: https://tonportfolio.com"
          className={`w-full px-3 py-2 border ${
            errors.portfolio ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
        />
        {errors.portfolio && (
          <p className="text-red-500 text-xs mt-1">{errors.portfolio}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="interests"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Centres d'intérêts (séparés par des virgules)
        </label>
        <input
          type="text"
          id="interests"
          value={formData.interests || ""}
          onChange={(e) => onFormUpdate({ interests: e.target.value })}
          placeholder="Ex: Design, Technologie, Voyages, Sports"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="needs"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Besoins professionnels
        </label>
        <textarea
          id="needs"
          value={formData.needs || ""}
          onChange={(e) => onFormUpdate({ needs: e.target.value })}
          rows={3}
          placeholder="Ex: Je cherche à développer mon réseau, trouver des opportunités de freelance..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="desires"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Désirs professionnels
        </label>
        <textarea
          id="desires"
          value={formData.desires || ""}
          onChange={(e) => onFormUpdate({ desires: e.target.value })}
          rows={3}
          placeholder="Ex: Je souhaite travailler sur des projets innovants, apprendre de nouvelles technologies..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>
    </div>
  );
};

export default AdditionalInfo;
