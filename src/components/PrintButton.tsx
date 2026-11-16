'use client';

import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({
  label = 'Als PDF speichern / Drucken',
  className = '',
}: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`print:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#F4EFE6] text-stone-800 border border-stone-300 hover:bg-[#e8e0d2] transition-colors cursor-pointer ${className}`.trim()}
    >
      <Printer className="w-4 h-4 text-[#6c943e]" />
      <span>{label}</span>
    </button>
  );
}
