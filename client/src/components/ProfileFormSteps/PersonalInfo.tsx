import { ProfileFormData } from "@shared/schema";

interface PersonalInfoProps {
  formData: Partial<ProfileFormData>;
  onFormUpdate: (data: Partial<ProfileFormData>) => void;
  errors: Record<string, string>;
}

const PersonalInfo = ({
  formData,
  onFormUpdate,
  errors,
}: PersonalInfoProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Informations personnelles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            1. Nom et Prénom *
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName || ""}
            onChange={(e) =>
              onFormUpdate({ fullName: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.fullName
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            2. Adresse email professionnelle *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email || ""}
            onChange={(e) => onFormUpdate({ email: e.target.value })}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            3. Numéro de téléphone *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => onFormUpdate({ phone: e.target.value })}
            className={`w-full px-3 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            4. Lien vers ton profil LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            value={formData.linkedin || ""}
            onChange={(e) => onFormUpdate({ linkedin: e.target.value })}
            placeholder="https://www.linkedin.com/in/ton-profil"
            className={`w-full px-3 py-2 border ${
              errors.linkedin ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
          />
          {errors.linkedin && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
