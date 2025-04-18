import { ProfileFormData } from "@shared/schema";
import { useState, useEffect } from "react";

interface ProfessionalInfoProps {
  formData: Partial<ProfileFormData>;
  onFormUpdate: (data: Partial<ProfileFormData>) => void;
  errors: Record<string, string>;
}

const domains = [
  "Développeur web",
  "Développeur fullstack",
  "Développeur mobile",
  "Designer UI/UX",
  "Graphiste",
  "Ingénieur BTP",
  "Ingénieur logiciel",
  "Chef de projet",
  "DevOps / Systèmes",
  "Data analyst / IA",
  "Consultant",
  "Marketing / Communication",
  "Rédacteur / Copywriter",
  "Autre"
];

const ProfessionalInfo = ({
  formData,
  onFormUpdate,
  errors,
}: ProfessionalInfoProps) => {
  const [showOtherDomain, setShowOtherDomain] = useState(
    formData.domain === "Autre"
  );

  useEffect(() => {
    setShowOtherDomain(formData.domain === "Autre");
  }, [formData.domain]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Informations professionnelles
      </h2>

      <div className="mb-4">
        <label
          htmlFor="domain"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          5. Quel est ton domaine principal? *
        </label>
        <select
          id="domain"
          value={formData.domain || ""}
          onChange={(e) => onFormUpdate({ domain: e.target.value })}
          className={`w-full px-3 py-2 border ${
            errors.domain ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
        >
          <option value="" disabled>
            Sélectionner un domaine
          </option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
        {errors.domain && (
          <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
        )}

        {showOtherDomain && (
          <div className="mt-2">
            <input
              type="text"
              id="otherDomain"
              value={formData.otherDomain || ""}
              onChange={(e) => onFormUpdate({ otherDomain: e.target.value })}
              placeholder="Précisez votre domaine"
              className={`w-full px-3 py-2 border ${
                errors.otherDomain ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
            />
            {errors.otherDomain && (
              <p className="text-red-500 text-xs mt-1">{errors.otherDomain}</p>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          6. Quel est ton titre de poste actuel? *
        </label>
        <input
          type="text"
          id="jobTitle"
          value={formData.jobTitle || ""}
          onChange={(e) => onFormUpdate({ jobTitle: e.target.value })}
          placeholder="Ex: Développeur front-end chez [Nom de l'entreprise]"
          className={`w-full px-3 py-2 border ${
            errors.jobTitle ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          7. Depuis combien de temps exerces-tu ce métier? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="experience-1"
              name="experience"
              value="Moins de 1 an"
              checked={formData.experience === "Moins de 1 an"}
              onChange={(e) => onFormUpdate({ experience: e.target.value })}
              className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300"
            />
            <label htmlFor="experience-1" className="ml-2 text-sm text-gray-700">
              Moins de 1 an
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="experience-2"
              name="experience"
              value="1 à 3 ans"
              checked={formData.experience === "1 à 3 ans"}
              onChange={(e) => onFormUpdate({ experience: e.target.value })}
              className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300"
            />
            <label htmlFor="experience-2" className="ml-2 text-sm text-gray-700">
              1 à 3 ans
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="experience-3"
              name="experience"
              value="3 à 5 ans"
              checked={formData.experience === "3 à 5 ans"}
              onChange={(e) => onFormUpdate({ experience: e.target.value })}
              className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300"
            />
            <label htmlFor="experience-3" className="ml-2 text-sm text-gray-700">
              3 à 5 ans
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="experience-4"
              name="experience"
              value="Plus de 5 ans"
              checked={formData.experience === "Plus de 5 ans"}
              onChange={(e) => onFormUpdate({ experience: e.target.value })}
              className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300"
            />
            <label htmlFor="experience-4" className="ml-2 text-sm text-gray-700">
              Plus de 5 ans
            </label>
          </div>
        </div>
        {errors.experience && (
          <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalInfo;
