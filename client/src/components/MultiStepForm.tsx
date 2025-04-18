import { useState } from "react";
import { ProfileFormData } from "@shared/schema";
import PersonalInfo from "./ProfileFormSteps/PersonalInfo";
import ProfessionalInfo from "./ProfileFormSteps/ProfessionalInfo";
import SkillsInfo from "./ProfileFormSteps/SkillsInfo";
import AdditionalInfo from "./ProfileFormSteps/AdditionalInfo";
import PhotoUpload from "./ProfileFormSteps/PhotoUpload";

interface MultiStepFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Partial<ProfileFormData>;
  onFormUpdate: (data: Partial<ProfileFormData>) => void;
  onGenerateCard: (data: ProfileFormData) => void;
}

const formSteps = [
  "Informations personnelles",
  "Informations professionnelles",
  "Compétences et projets",
  "Informations complémentaires",
  "Photo de profil",
];

const MultiStepForm = ({
  currentStep,
  setCurrentStep,
  formData,
  onFormUpdate,
  onGenerateCard,
}: MultiStepFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrentStep = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Validation for step 1: Personal Information
    if (currentStep === 0) {
      if (!formData.fullName || formData.fullName.trim() === "") {
        newErrors.fullName = "Nom et prénom sont requis";
        isValid = false;
      }
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Adresse email valide requise";
        isValid = false;
      }
      if (!formData.phone || formData.phone.trim() === "") {
        newErrors.phone = "Numéro de téléphone requis";
        isValid = false;
      }
      if (formData.linkedin && !/^https?:\/\//.test(formData.linkedin)) {
        newErrors.linkedin = "L'URL LinkedIn doit commencer par http:// ou https://";
        isValid = false;
      }
    }

    // Validation for step 2: Professional Information
    else if (currentStep === 1) {
      if (!formData.domain || formData.domain.trim() === "") {
        newErrors.domain = "Domaine requis";
        isValid = false;
      }
      if (formData.domain === "Autre" && (!formData.otherDomain || formData.otherDomain.trim() === "")) {
        newErrors.otherDomain = "Veuillez préciser votre domaine";
        isValid = false;
      }
      if (!formData.jobTitle || formData.jobTitle.trim() === "") {
        newErrors.jobTitle = "Titre de poste requis";
        isValid = false;
      }
      if (!formData.experience || formData.experience.trim() === "") {
        newErrors.experience = "Expérience requise";
        isValid = false;
      }
    }

    // Validation for step 3: Skills and Projects
    else if (currentStep === 2) {
      if (!formData.tools || formData.tools.trim() === "") {
        newErrors.tools = "Outils ou technologies requis";
        isValid = false;
      }
      if (!formData.projectTypes || formData.projectTypes.length === 0) {
        newErrors.projectTypes = "Au moins un type de projet est requis";
        isValid = false;
      }
      if (
        formData.projectTypes &&
        formData.projectTypes.includes("Autre") &&
        (!formData.otherProject || formData.otherProject.trim() === "")
      ) {
        newErrors.otherProject = "Veuillez préciser le type de projet";
        isValid = false;
      }
    }

    // Validation for step 4: Additional Information - no required fields
    // Validation for step 5: Photo Upload - no required fields

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGenerateCard = () => {
    // Final validation to ensure all required fields are filled
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "domain",
      "jobTitle",
      "experience",
      "tools",
      "projectTypes",
    ];
    
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    requiredFields.forEach(field => {
      if (
        !formData[field as keyof ProfileFormData] || 
        (typeof formData[field as keyof ProfileFormData] === 'string' && 
          (formData[field as keyof ProfileFormData] as string).trim() === '')
      ) {
        newErrors[field] = `Le champ ${field} est requis`;
        isValid = false;
      }
    });
    
    if (formData.domain === "Autre" && (!formData.otherDomain || formData.otherDomain.trim() === "")) {
      newErrors.otherDomain = "Veuillez préciser votre domaine";
      isValid = false;
    }
    
    if (
      formData.projectTypes &&
      formData.projectTypes.includes("Autre") &&
      (!formData.otherProject || formData.otherProject.trim() === "")
    ) {
      newErrors.otherProject = "Veuillez préciser le type de projet";
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      onGenerateCard(formData as ProfileFormData);
    }
  };

  const progressPercentage = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <div>
      <div className="px-6 pt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#D4AF37] h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Étape {currentStep + 1} sur {formSteps.length}
        </p>
      </div>

      <div className="p-6">
        {currentStep === 0 && (
          <PersonalInfo
            formData={formData}
            onFormUpdate={onFormUpdate}
            errors={errors}
          />
        )}
        {currentStep === 1 && (
          <ProfessionalInfo
            formData={formData}
            onFormUpdate={onFormUpdate}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <SkillsInfo
            formData={formData}
            onFormUpdate={onFormUpdate}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <AdditionalInfo
            formData={formData}
            onFormUpdate={onFormUpdate}
            errors={errors}
          />
        )}
        {currentStep === 4 && (
          <PhotoUpload
            formData={formData}
            onFormUpdate={onFormUpdate}
            errors={errors}
          />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Précédent
            </button>
          )}
          {currentStep < formSteps.length - 1 ? (
            <button
              onClick={handleNext}
              className={`${
                currentStep === 0 ? "ml-auto" : ""
              } bg-[#D4AF37] hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300`}
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={handleGenerateCard}
              className="bg-[#D4AF37] hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Générer ma carte de profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
