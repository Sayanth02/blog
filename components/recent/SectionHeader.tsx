import {  CircleChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SectionHeader = () => {
  return (
    <div className="w-full text-sm  border border-neutaral-lighter rounded-2xl p-4 md:p-8 flex justify-between items-center">
      <h2>Recent Posts</h2>
      <Link
        className="flex gap-2 items-center underline font-bold text-lg "
        href={"/posts"}
      >
        Discover More <CircleChevronRight />
      </Link>
    </div>
  );
}

export default SectionHeader