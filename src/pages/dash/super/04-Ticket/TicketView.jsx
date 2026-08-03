import React, { useState } from 'react';
import TicketSection from './components/TicketSection';

export default function TicketView() {
  const [activeTab, setActiveTab] = useState('panoramica');

  const tabs = [
    { id: 'panoramica', label: 'Panoramica' },
    { id: 'aperti', label: 'Ticket aperti' },
    { id: 'attesa', label: 'In lavorazione' },
    { id: 'chiusi', label: 'Ticket chiusi' },
  ];

  return (
    <div className="min-w-0">
      <div className="h-full">
        <div className="border-b border-gray-200 bg-white">
          <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 sm:gap-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap sm:px-6 sm:py-4 ${
                  activeTab === tab.id
                    ? 'border-teal-500 bg-gray-50 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <section className="pt-3 sm:pt-4">
          <TicketSection activeTab={activeTab} />
        </section>
      </div>
    </div>
  );
}
