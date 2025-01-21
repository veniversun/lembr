import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Link to="/" className="block">
      <div className="bg-[#222222] w-full py-8">
        <div className="text-center mb-8 md:mb-12">
          <img 
            src="/lovable-uploads/e6a9cd5d-82fc-4aae-9551-68bde6dbf68b.png" 
            alt="Lembr Logo" 
            className="h-12 mx-auto"
          />
        </div>
      </div>
    </Link>
  );
};