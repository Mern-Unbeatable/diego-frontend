import React from 'react';
import FigurePrevisteDashboard from './components/FigurePrevisteDashboard';
import StaffRoleSection from './components/StaffRoleSection';
import { STAFF_FIGURE_SECTIONS } from '../../../../features/api/staffMappers';

export default function FiguresView() {
  return (
    <div className="space-y-6 rounded-3xl">
      <FigurePrevisteDashboard />

      {STAFF_FIGURE_SECTIONS.map((section) => (
        <StaffRoleSection key={section.role} {...section} />
      ))}
    </div>
  );
}
