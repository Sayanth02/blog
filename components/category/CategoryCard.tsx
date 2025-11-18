import React from 'react'

interface CategoryCardProps {
  category: {
    title: string;
    icon: React.ReactNode;
  };
}
const CategoryCard = ({category}:CategoryCardProps) => {
  return (
    <div className="px-10 py-12 rounded-2xl border border-neutaral-lighter flex gap-4 items-center justify-center text-2xl font-bold hover:shadow-lg hover:scale-102 transition-transform cursor-pointer">
      {category.icon} {category.title}
    </div>
  );
}

export default CategoryCard