import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Link to="/" className="block">
      <div className="bg-[#222222] w-full py-8">
        <div className="text-center mb-8 md:mb-12">
          <p>

          L e m b r .

          </p>
        </div>
      </div>
    </Link>
  );
};