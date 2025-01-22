import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/home/Header";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSuccess = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isLogin ? "Login" : "Criar Conta"}
            </h1>
            {isLogin ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <SignUpForm 
                onSuccess={handleSuccess} 
                onBack={() => setIsLogin(true)} 
              />
            )}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-sm text-gray-600 hover:text-gray-800 text-center mt-4"
            >
              {isLogin
                ? "Não tem uma conta? Cadastre-se"
                : "Já tem uma conta? Faça login"}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;