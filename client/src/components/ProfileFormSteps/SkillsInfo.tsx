import { ProfileFormData } from "@shared/schema";
import { useState, useEffect } from "react";

interface SkillsInfoProps {
  formData: Partial<ProfileFormData>;
  onFormUpdate: (data: Partial<ProfileFormData>) => void;
  errors: Record<string, string>;
}

const projectTypeOptions = [
  "Sites web vitrines",
  "Applications web",
  "Applications mobiles",
  "Identité visuelle (logo, charte graphique, etc.)",
  "UI/UX design",
  "Gestion de projet",
  "BTP / Chantier / Architecture",
  "Marketing digital / réseaux sociaux",
  "Autre"
];

const SkillsInfo = ({
  formData,
  onFormUpdate,
  errors,
}: SkillsInfoProps) => {
  const [projectTypes, setProjectTypes] = useState<string[]>(
    formData.projectTypes || []
  );
  const [showOtherProject, setShowOtherProject] = useState(
    formData.projectTypes?.includes("Autre") || false
  );

  useEffect(() => {
    setProjectTypes(formData.projectTypes || []);
  }, [formData.projectTypes]);

  useEffect(() => {
    setShowOtherProject(projectTypes.includes("Autre"));
  }, [projectTypes]);

  const handleProjectTypesChange = (projectType: string) => {
    const newProjectTypes = projectTypes.includes(projectType)
      ? projectTypes.filter((type) => type !== projectType)
      : [...projectTypes, projectType];
    
    setProjectTypes(newProjectTypes);
    onFormUpdate({ projectTypes: newProjectTypes });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Compétences et projets
      </h2>

      <div className="mb-4">
        <label
          htmlFor="tools"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          8. Quels outils ou technologies utilises-tu régulièrement? *
        </label>
        <textarea
          id="tools"
          value={formData.tools || ""}
          onChange={(e) => onFormUpdate({ tools: e.target.value })}
          rows={3}
          placeholder="Ex: Figma, React, Laravel, AutoCAD, Illustrator, Trello, etc."
          className={`w-full px-3 py-2 border ${
            errors.tools ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
        />
        {errors.tools && (
          <p className="text-red-500 text-xs mt-1">{errors.tools}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          9. Quel(s) type(s) de projet réalises-tu le plus souvent? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {projectTypeOptions.map((type, index) => (
            <div key={index} className="flex items-start">
              <input
                type="checkbox"
                id={`project-${index + 1}`}
                checked={projectTypes.includes(type)}
                onChange={() => handleProjectTypesChange(type)}
                className="mt-1 w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded"
              />
              <label
                htmlFor={`project-${index + 1}`}
                className="ml-2 text-sm text-gray-700"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
        {errors.projectTypes && (
          <p className="text-red-500 text-xs mt-1">{errors.projectTypes}</p>
        )}

        {showOtherProject && (
          <div className="mt-2">
            <input
              type="text"
              id="otherProject"
              value={formData.otherProject || ""}
              onChange={(e) => onFormUpdate({ otherProject: e.target.value })}
              placeholder="Précisez le type de projet"
              className={`w-full px-3 py-2 border ${
                errors.otherProject ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
            />
            {errors.otherProject && (
              <p className="text-red-500 text-xs mt-1">{errors.otherProject}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsInfo;
