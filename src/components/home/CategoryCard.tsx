import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  Icon: LucideIcon;
  title: string;
  path: string;
}

export const CategoryCard = ({ Icon, title, path }: CategoryCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-3 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 shadow-md">
        <Icon className="h-8 w-8 md:h-10 md:w-10 text-orange-500" />
      </div>
      <Link to={path} className="w-full">
        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
          {title}
        </Button>
      </Link>
    </div>
  );
};