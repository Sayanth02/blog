import Link from 'next/link';
import React from 'react'

interface ButtonProps {
  label: string;
  link?: string;
  className?: string;
}

const Button = ({label,link,className}: ButtonProps) => {
  return (
    <Link href={`${link}`} className={`px-8 py-4 bg-black text-white font-semibold rounded-4xl ${className}`}>
        {label}
    </Link>
  )
}

export default Button