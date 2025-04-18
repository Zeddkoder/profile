import { ProfileFormData } from "@shared/schema";
import { useRef } from "react";
import html2canvas from "html2canvas";

interface ProfileCardProps {
  formData: ProfileFormData;
}

const ProfileCard = ({ formData }: ProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const getDisplayDomain = () => {
    if (formData.domain === "Autre" && formData.otherDomain) {
      return formData.otherDomain.toUpperCase();
    }
    return formData.domain.toUpperCase();
  };

  const renderInterests = () => {
    if (!formData.interests) return "--";
    
    return formData.interests
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest)
      .map((interest, index) => (
        <div key={index}>Aime {interest}</div>
      ));
  };

  const renderNeeds = () => {
    if (!formData.needs) return "--";
    
    return formData.needs
      .split("\n")
      .filter((need) => need.trim())
      .map((need, index) => (
        <div key={index}>J'ai besoin {need}</div>
      ));
  };

  const renderDesires = () => {
    if (!formData.desires) return "--";
    
    return formData.desires
      .split("\n")
      .filter((desire) => desire.trim())
      .map((desire, index) => (
        <div key={index}>Je désire {desire}</div>
      ));
  };

  const renderTools = () => {
    if (!formData.tools) return "--";
    
    return (
      <div className="grid grid-cols-1 gap-1">
        {formData.tools.split(",").map((tool, index) => (
          <div key={index}>{tool.trim()}</div>
        ))}
      </div>
    );
  };

  const renderHabits = () => {
    if (!formData.projectTypes || formData.projectTypes.length === 0) return "--";
    
    return formData.projectTypes.map((project, index) => {
      if (project === "Autre" && formData.otherProject) {
        return <div key={index}>Travaille sur des projets de {formData.otherProject}</div>;
      }
      return <div key={index}>Travaille sur des projets de {project}</div>;
    });
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#121212",
        logging: false,
      });
      
      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `${formData.fullName.replace(/\s+/g, "_")}_profile_card.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error generating profile card:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        id="profile-card"
        ref={cardRef}
        className="bg-[#121212] text-white rounded-lg overflow-hidden mx-auto max-w-3xl shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Photo and Basic Info */}
          <div className="bg-[#1E1E1E] p-6 md:w-1/3 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <img
                src={formData.photoUrl || "https://via.placeholder.com/200x200"}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">
              {formData.fullName}
            </h2>
            <div className="text-gray-300 text-sm mb-4">
              <div className="mb-1">
                <span className="font-semibold">Expérience:</span>{" "}
                <span>{formData.experience}</span>
              </div>
            </div>
            <div className="bg-[#1E1E1E] w-full mt-2">
              <h3 className="font-semibold mb-1">Profil</h3>
              <p className="text-sm text-gray-300">{formData.jobTitle}</p>
            </div>
            <div className="bg-[#1E1E1E] w-full mt-4">
              <h3 className="font-semibold mb-1">Contact</h3>
              <p className="text-sm text-gray-300">
                {formData.email}<br />
                {formData.phone}
              </p>
            </div>
            {formData.portfolio && (
              <div className="bg-[#1E1E1E] w-full mt-4">
                <h3 className="font-semibold mb-1">Portfolio</h3>
                <p className="text-sm text-gray-300 break-words">{formData.portfolio}</p>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="p-6 md:w-2/3">
            <h1 className="text-2xl font-bold mb-4 text-[#D4AF37]">
              {getDisplayDomain()} EN PUISSANCE
            </h1>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-[#D4AF37] mr-2">🔧</span>
                <h3 className="text-xl font-semibold">Outils</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="col-span-2">{renderTools()}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-[#D4AF37] mr-2">🎯</span>
                <h3 className="text-xl font-semibold">Centre D'intérêts</h3>
              </div>
              <div className="text-sm">{renderInterests()}</div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-[#D4AF37] mr-2">✨</span>
                <h3 className="text-xl font-semibold">Besoins</h3>
              </div>
              <div className="text-sm">{renderNeeds()}</div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-[#D4AF37] mr-2">❤️</span>
                <h3 className="text-xl font-semibold">Désirs</h3>
              </div>
              <div className="text-sm">{renderDesires()}</div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="text-[#D4AF37] mr-2">⏱️</span>
                <h3 className="text-xl font-semibold">Habitudes</h3>
              </div>
              <div className="text-sm">{renderHabits()}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={downloadCard}
          className="bg-[#D4AF37] hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mr-4"
        >
          Télécharger ma carte
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
