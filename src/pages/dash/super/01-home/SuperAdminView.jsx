// src/components/admin/super/sections/SuperAdminHome.jsx
import React, { useState } from 'react';

// Adjust paths if your folders differ
import KPIStateCards from './components/KPIStateCards';
import EmergencyControlPanel from './components/EmergencyControlPanel';
import LicenseeManagement from './components/LicenseeManagement';
import AddCourseModal from './components/AddCourseModal';

function SuperAdminView() {
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

  const handleAddCourse = () => {
    setIsAddCourseModalOpen(true);
  };

  const handleSaveCourse = (courseData) => {
    console.log('Saving new course:', courseData);
    // Here you would typically send the data to your backend
    setIsAddCourseModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-8">
        {/* Top KPI cards */}
        <KPIStateCards
          revenue7d={82350}
          revenueTrend={8}
          revenue30d={247650}
          activeUsers={47650}
          usersTrend={12}
          licenses={{ total: 156, active: 142, trial: 14, trend: 12 }}
          health={99.97}
          uptime={0.02}
          totalCourses={10}
          onAddCourse={handleAddCourse}
        />

        {/* Emergency control panel (the grey block with 4 toggle cards) */}
        <EmergencyControlPanel />
        {/* Licensees table with toolbar (search, export, edit) */}
        <LicenseeManagement />
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onSave={handleSaveCourse}
      />
    </div>
  );
}

export default SuperAdminView;
