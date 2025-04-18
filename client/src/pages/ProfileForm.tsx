import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MultiStepForm from "@/components/MultiStepForm";
import ProfileCard from "@/components/ProfileCard";
import { ProfileFormData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ProfileForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ProfileFormData>>({});
  const [showCard, setShowCard] = useState(false);
  const { toast } = useToast();

  const saveMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiRequest("POST", "/api/profiles", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profil sauvegardé",
        description: "Votre profil professionnel a été sauvegardé avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Échec de la sauvegarde du profil: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleFormUpdate = (data: Partial<ProfileFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleGenerateCard = async (completeData: ProfileFormData) => {
    setFormData(completeData);
    try {
      await saveMutation.mutateAsync(completeData);
      setShowCard(true);
    } catch (error) {
      console.error("Failed to save profile", error);
    }
  };

  const handleEditForm = () => {
    setShowCard(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto overflow-hidden">
        <div className="bg-[#1E1E1E] p-6 text-white">
          <h1 className="text-2xl font-semibold text-center text-[#D4AF37]">
            🎯 Formulaire - Identification de profil professionnel
          </h1>
          <p className="text-center mt-2 text-gray-300">
            Créez votre carte de profil professionnelle personnalisée
          </p>
        </div>

        {!showCard ? (
          <MultiStepForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            onFormUpdate={handleFormUpdate}
            onGenerateCard={handleGenerateCard}
          />
        ) : (
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Votre carte de profil professionnelle
            </h2>

            <ProfileCard formData={formData as ProfileFormData} />

            <div className="flex justify-center mt-6 mb-6">
              <button
                id="edit-form"
                onClick={handleEditForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Modifier mes informations
              </button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
