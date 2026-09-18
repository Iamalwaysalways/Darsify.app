import React from 'react';

interface DarsifyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const DarsifyLogo: React.FC<DarsifyLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const tagSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[11px] tracking-[0.22em]',
    lg: 'text-xs tracking-[0.25em]',
    xl: 'text-sm tracking-[0.3em]',
  };

  return (
    <div id="darsify-brand-logo" className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* Glowing Book & Lightning Icon matching image 1 & 4 */}
        <div
          className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-[#6E3482] to-[#49225B] p-0.5 shadow-lg shadow-[#6E3482]/40 flex items-center justify-center`}
        >
          <div className="w-full h-full rounded-[14px] bg-[#2A1335] flex items-center justify-center relative overflow-hidden">
            {/* Subtle light glow behind */}
            <div className="absolute inset-0 bg-radial from-[#A56ABD]/30 via-transparent to-transparent opacity-70" />
            
            <svg
              className="w-3/5 h-3/5 text-[#E7DBEF] relative z-10 drop-shadow-[0_0_8px_rgba(165,106,189,0.8)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.25" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col">
          <span
            className={`${titleSizes[size]} font-extrabold tracking-wider bg-gradient-to-r from-white via-[#E7DBEF] to-[#A56ABD] bg-clip-text text-transparent font-sans`}
          >
            DARSIFY
          </span>
        </div>
      </div>

      {showTagline && (
        <span
          className={`mt-1 font-semibold text-[#A56ABD] uppercase ${tagSizes[size]} text-center`}
        >
          AI-POWERED EDUCATION
        </span>
      )}
    </div>
  );
};
