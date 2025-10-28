'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnswerButtonProps {
  option: {
    id: string;
    text: string;
    imageUrl: string;
    value: string;
  };
  onClick: () => void;
  variant: 'v1' | 'v2' | 'v3';
}

export default function AnswerButton({ option, onClick, variant }: AnswerButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'v1':
        return 'hover:shadow-blue-500/25 border-blue-200';
      case 'v2':
        return 'hover:shadow-green-500/25 border-green-200';
      case 'v3':
        return 'hover:shadow-orange-500/25 border-orange-200';
      default:
        return 'hover:shadow-blue-500/25 border-blue-200';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full h-48 rounded-2xl overflow-hidden border-2 
        ${getVariantStyles()}
        hover:scale-105 hover:shadow-2xl
        transition-all duration-300 ease-out
        group cursor-pointer
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image
        src={option.imageUrl}
        alt={option.text}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span className="text-white text-lg font-semibold text-center leading-tight">
          {option.text}
        </span>
      </div>
    </motion.button>
  );
}
