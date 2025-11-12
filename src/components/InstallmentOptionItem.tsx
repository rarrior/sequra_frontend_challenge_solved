import React from 'react';

export const InstallmentOptionItem: React.FC<{
  option: InstallmentOption;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ option, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left p-3 rounded-lg border-2 transition-all
        ${isSelected 
          ? 'border-blue-600 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
        }
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-gray-900">
            {option.instalment_count} cuotas de {option.instalment_total.string}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Coste fijo: {option.instalment_fee.string}/cuota
          </div>
        </div>
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}
        `}>
          {isSelected && (
            <div className="w-2 h-2 bg-white rounded-full" />
          )}
        </div>
      </div>
    </button>
  );
};