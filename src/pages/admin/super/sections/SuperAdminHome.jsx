// src/components/admin/super/sections/SuperAdminHome.jsx
import React, { useState } from 'react';

// Adjust paths if your folders differ
import SuperAdminDashboard from '../components/SuperAdminDashboard';
import EmergencySuperAdminDashboard from '../components/EmergencySuperAdminDashboard';
import LicenseeSuperAdminDashboard from '../components/LicenseeSuperAdminDashboard';
import AddCourseModal from '../components/AddCourseModal';

export default function SuperAdminHome() {
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
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 md:space-y-10 md:px-6 md:py-8">
        {/* Top KPI cards */}
        <section>
          <SuperAdminDashboard
            revenue30d={247650}
            revenueTrend={12}
            activeUsers={47650}
            usersTrend={12}
            licenses={{ total: 156, active: 142, trial: 14, trend: 12 }}
            health={99.97}
            uptime={0.02}
            totalCourses={10}
            onAddCourse={handleAddCourse}
          />
        </section>

        {/* Emergency control panel (the grey block with 4 toggle cards) */}
        <section>
          <EmergencySuperAdminDashboard />
        </section>

        {/* Licensees table with toolbar (search, export, edit) */}
        <section>
          <LicenseeSuperAdminDashboard />
        </section>
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
