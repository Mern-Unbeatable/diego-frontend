import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Package } from 'lucide-react';
import CoursesTable from '../01-Home/components/CoursesTable';
import CoursePackagesPanel from '../../super/01-home/components/CoursePackagesPanel';

const TABS = [
  { id: 'courses', label: 'I miei corsi', icon: BookOpen },
  { id: 'packages', label: 'Pacchetti corso', icon: Package },
];

export default function CoursesWithPackagesTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const initialTab = tabFromUrl === 'packages' ? 'packages' : 'courses';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mountedTabs, setMountedTabs] = useState({
    courses: initialTab === 'courses',
    packages: initialTab === 'packages',
  });

  useEffect(() => {
    const nextTab = tabFromUrl === 'packages' ? 'packages' : 'courses';
    setActiveTab(nextTab);
    setMountedTabs((current) => ({ ...current, [nextTab]: true }));
  }, [tabFromUrl]);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    setMountedTabs((current) => ({ ...current, [tabId]: true }));
    if (tabId === 'packages') {
      setSearchParams({ tab: 'packages' });
      return;
    }
    setSearchParams({});
  };

  return (
    <div className="min-w-0">
      <div className="-mx-1 mb-4 flex gap-1 overflow-x-auto border-b border-[#e3ece8] px-1 pb-px sm:mb-6 sm:gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-3 ${
                isActive
                  ? 'border-[#73BFA1] text-[#2f5f4a]'
                  : 'border-transparent text-[#6b7471] hover:text-[#2f3d37]'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {mountedTabs.courses ? (
        <div
          className={activeTab === 'courses' ? '' : 'hidden'}
          aria-hidden={activeTab !== 'courses'}
        >
          <CoursesTable />
        </div>
      ) : null}

      {mountedTabs.packages ? (
        <div
          className={activeTab === 'packages' ? '' : 'hidden'}
          aria-hidden={activeTab !== 'packages'}
        >
          <CoursePackagesPanel />
        </div>
      ) : null}
    </div>
  );
}
