import React from 'react';
import { X } from 'lucide-react';

interface ActionClearProps {
  children: React.ReactNode;
  value: string | number | undefined | null;
  onClear: () => void;
  disabled?: boolean;
  /**
   * Size of the X button
   * - 'sm': h-3.5 w-3.5
   * - 'md': h-4 w-4
   * - 'lg': h-5 w-5
   */
  size?: 'sm' | 'md' | 'lg';
}

const ActionClear = ({
  children,
  value,
  onClear,
  disabled = false,
  size = 'md'
}: ActionClearProps) => {
  const hasValue = value !== undefined && value !== null && value !== '';

  const getSizeClass = () => {
    if (size === 'sm') return 'h-3.5 w-3.5';
    if (size === 'md') return 'h-4 w-4';
    if (size === 'lg') return 'h-5 w-5';
    return 'h-4 w-4';
  };

  return (
    <div className="relative">
      {children}

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClear();
          }}
          className={`absolute right-9 top-1/2 -translate-y-1/2 p-1 bg-white hover:bg-gray-100 rounded-full transition-colors z-10 cursor-pointer`}
          aria-label="Clear selection"
        >
          <X className={`${getSizeClass()} text-gray-500 hover:text-gray-700`} />
        </button>
      )}
    </div>
  );
};

export default ActionClear;