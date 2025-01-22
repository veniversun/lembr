import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Link to="/" className="block">
      <div className="bg-[#222222] w-full py-4">
        <div className="text-center">
          <p style={{ color: '#f6d964', alignItems: 'center' }} className="text-center leading-relaxed text-3xl md:text-5xl font-bold">
            L e m b r .
          </p>
        </div>
      </div>
    </Link>
  );
};