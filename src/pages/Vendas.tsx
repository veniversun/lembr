import React, { useEffect, useState } from 'react';
import { Header } from '@/components/home/Header';
import { ComparisonTable } from '@/components/sales/ComparisonTable';
import { HorizontalAnalytics } from '@/components/sales/HorizontalAnalytics';
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Vendas = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpgrade = async () => {
    if (!session) {
      window.location.href = "/auth";
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_plus: true })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Sua conta foi atualizada para PLUS.",
      });

      // Redirect to practice page after successful upgrade
      window.location.href = "/practice";
    } catch (error) {
      console.error("Error upgrading account:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar sua conta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <p className="text-gray-700 text-center leading-relaxed text-4xl md:text-5xl font-bold mt-8">
          Seja um profissional em aplicar <br /> as melhores ideias!
        </p>
              
        <ComparisonTable onUpgradeClick={handleUpgrade} />
        <HorizontalAnalytics />
      </div>
    </div>
  );
};

export default Vendas;