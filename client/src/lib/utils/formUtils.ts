import { ProfileFormData } from "@shared/schema";

/**
 * Validates the current step of the form
 */
export const validateStep = (
  step: number,
  formData: Partial<ProfileFormData>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  // Step 1: Personal Information
  if (step === 0) {
    if (!formData.fullName || formData.fullName.trim() === "") {
      errors.fullName = "Nom et prénom sont requis";
      isValid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Adresse email valide requise";
      isValid = false;
    }

    if (!formData.phone || formData.phone.trim() === "") {
      errors.phone = "Numéro de téléphone requis";
      isValid = false;
    }

    if (
      formData.linkedin &&
      !/^https?:\/\/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}[\/#]?/.test(
        formData.linkedin
      )
    ) {
      errors.linkedin = "URL LinkedIn invalide";
      isValid = false;
    }
  }

  // Step 2: Professional Information
  else if (step === 1) {
    if (!formData.domain || formData.domain.trim() === "") {
      errors.domain = "Domaine requis";
      isValid = false;
    }

    if (
      formData.domain === "Autre" &&
      (!formData.otherDomain || formData.otherDomain.trim() === "")
    ) {
      errors.otherDomain = "Veuillez préciser votre domaine";
      isValid = false;
    }

    if (!formData.jobTitle || formData.jobTitle.trim() === "") {
      errors.jobTitle = "Titre de poste requis";
      isValid = false;
    }

    if (!formData.experience || formData.experience.trim() === "") {
      errors.experience = "Expérience requise";
      isValid = false;
    }
  }

  // Step 3: Skills and Projects
  else if (step === 2) {
    if (!formData.tools || formData.tools.trim() === "") {
      errors.tools = "Outils ou technologies requis";
      isValid = false;
    }

    if (!formData.projectTypes || formData.projectTypes.length === 0) {
      errors.projectTypes = "Au moins un type de projet est requis";
      isValid = false;
    }

    if (
      formData.projectTypes &&
      formData.projectTypes.includes("Autre") &&
      (!formData.otherProject || formData.otherProject.trim() === "")
    ) {
      errors.otherProject = "Veuillez préciser le type de projet";
      isValid = false;
    }
  }

  // Step 4: Additional Information - all optional

  // Step 5: Photo Upload - optional

  return { isValid, errors };
};

/**
 * Formats project types for display
 */
export const formatProjectTypes = (
  projectTypes: string[],
  otherProject?: string
): string => {
  if (!projectTypes || projectTypes.length === 0) return "";

  return projectTypes
    .map((type) => {
      if (type === "Autre" && otherProject) {
        return otherProject;
      }
      return type;
    })
    .join(", ");
};

/**
 * Formats interests for display
 */
export const formatInterests = (interests?: string): string[] => {
  if (!interests) return [];
  return interests
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);
};
