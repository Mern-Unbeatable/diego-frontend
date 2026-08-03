import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InquiriesSection from './components/InquiriesSection';

export default function InquiriesView() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('services');

  const tabs = [
    { id: 'services', labelKey: 'platformAdmin.inquiries.tabs.services' },
    { id: 'contacts', labelKey: 'platformAdmin.inquiries.tabs.contacts' },
    { id: 'collaborations', labelKey: 'platformAdmin.inquiries.tabs.collaborations' },
  ];

  return (
    <div className="min-w-0">
      <div className="border-b border-gray-200 bg-white">
        <nav className="-mx-1 flex gap-0 overflow-x-auto px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap sm:px-6 sm:py-4 ${
                activeTab === tab.id
                  ? 'border-teal-500 bg-gray-50 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </nav>
      </div>

      <section className="p-3 sm:p-4">
        <InquiriesSection activeTab={activeTab} />
      </section>
    </div>
  );
}
