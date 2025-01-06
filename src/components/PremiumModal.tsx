import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { AuthLayout } from "./auth/AuthLayout";
import { SignUpForm } from "./auth/SignUpForm";
import { AnalyticsPreview } from "./premium/AnalyticsPreview";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <AuthLayout
              title="Acesse todas as funcionalidades"
              description="Crie sua conta para acessar todos os recursos"
            >
              <SignUpForm
                onLoginClick={() => onOpenChange(false)}
                onSuccess={() => onOpenChange(false)}
              />
            </AuthLayout>
          </div>
          <div className="flex-1">
            <AnalyticsPreview />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};