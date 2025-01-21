import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Link to="/" className="block">
      <div className="bg-[#222222] w-full py-8">
        <div className="text-center mb-8 md:mb-12">
          <img 
            src="/lovable-uploads/4544ad8c-3ddb-4d5e-8990-3285fa9129cf.png" 
            alt="Lembr Logo" 
            className="h-12 mx-auto"
          />
        </div>
      </div>
    </Link>
  );
};