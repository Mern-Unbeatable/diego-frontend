import React from 'react';
import FigurePrevisteDashboard from './components/FigurePrevisteDashboard';
import StaffRoleSection from './components/StaffRoleSection';
import { STAFF_FIGURE_SECTIONS } from '../../../../features/api/staffMappers';

export default function FiguresView() {
  return (
    <div className="min-w-0 space-y-4 sm:space-y-5 lg:space-y-6">
      <FigurePrevisteDashboard />

      {STAFF_FIGURE_SECTIONS.map((section) => (
        <StaffRoleSection key={section.role} {...section} />
      ))}
    </div>
  );
}
