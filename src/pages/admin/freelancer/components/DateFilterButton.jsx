import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const DateFilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Ultimi 7 giorni');

  const options = [
    'Ultimi 7 giorni',
    'Ultimi 14 giorni',
    'Ultimi 30 giorni',
    'Ultimi 3 mesi',
    'Ultimi 6 mesi',
    'Ultimo anno'
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-gray-700 transition-all hover:border-gray-400 hover:shadow-sm"
      >
        <Calendar className="h-5 w-5 text-gray-600" />
        <span className="text-sm lg:text-base font-normal">{selectedOption}</span>
        <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 w-full min-w-[240px] rounded-xl border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-6 py-3 text-left text-sm transition-colors hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                selectedOption === option ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DateFilterButton;