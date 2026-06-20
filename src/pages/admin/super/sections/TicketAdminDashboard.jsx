import React, { useState } from 'react';
import TicketSection from '../components/TicketSection';

export default function TicketAdminDashboard() {
  const [activeTab, setActiveTab] = useState('panoramica');

  const tabs = [
    { id: 'panoramica', label: 'Panoramica' },
    { id: 'aperti', label: 'Tickets aperti' },
    { id: 'chiusi', label: 'Tickets chiusi' },
    { id: 'attesa', label: 'In attesa di approvazione' },
    { id: 'approvati', label: 'Corsi approvati' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="h-full">
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === tab.id
                    ? 'border-teal-500 bg-gray-50 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  } `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <section className="p-6">
          <TicketSection activeTab={activeTab} />
        </section>
      </div>
    </div>
  );

}
