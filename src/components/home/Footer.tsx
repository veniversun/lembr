import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting form data:', formData);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      console.log('Response from edge function:', { data, error });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Retornaremos em breve.",
      });
      
      setIsContactOpen(false);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#414145] backdrop-blur-md mt-12 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex gap-8">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Sobre
          </Link>

          <Link to="/vendas" className="text-white/80 hover:text-white transition-colors">
            Seja Pro
          </Link>

          <a 
            href="https://www.instagram.com/lembr_livros/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Termos de Uso
          </Link>

          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Política de Privacidade
          </Link>

          <button 
            onClick={() => setIsContactOpen(true)}
            className="text-white/80 hover:text-white transition-colors"
          >
            Fale Conosco
          </button>
        </nav>
        <p className="text-white/70 text-sm">
          Made in Brazil 🇧🇷
        </p>
      </div>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Entre em Contato</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para nos enviar uma mensagem.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </footer>
  );
};