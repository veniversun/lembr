import { useState } from "react";
import { CadastroHeader } from "@/components/cadastro/CadastroHeader";
import { CadastroForm } from "@/components/cadastro/CadastroForm";
import { RegistrationSuccessModal } from "@/components/RegistrationSuccessModal";

export default function Cadastro() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <CadastroHeader />
      
      <div className="max-w-2xl mx-auto mt-8 space-y-8">
        <CadastroForm onSuccess={() => setShowSuccessModal(true)} />
      </div>

      <RegistrationSuccessModal 
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
      />
    </div>
  );
}