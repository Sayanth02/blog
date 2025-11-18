import React from 'react'
import CategoryCard from './CategoryCard';
import {  CircleChevronRight, Clock, FolderPen, Globe, LayoutDashboard, NotebookPen, PenTool,  } from 'lucide-react';
import Link from 'next/link';

const Categories = () => {
    const categories = [
      { title: "Web Development", icon: <Globe /> },
      { title: "Frontend", icon: <LayoutDashboard /> },
      { title: "UI/UX", icon: <PenTool /> },
      { title: "Tutorials", icon: <NotebookPen /> },
      { title: "Productivity", icon: <Clock /> },
      { title: "Projects", icon: <FolderPen /> },
    ];
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="w-full border border-neutaral-lighter rounded-2xl p-8 flex justify-between items-center mb-8">
        <h2>Categories</h2>
        <Link
          className="flex gap-2 items-center underline font-bold text-lg "
          href={"/posts"}
        >
          Discover More <CircleChevronRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories