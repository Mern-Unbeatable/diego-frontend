import React from 'react';
import Henrey from '../01-Home/components/Henrey';
import CoursesTable from '../01-Home/components/CoursesTable';
import LicenReports from './components/LicenReports';

const LicenseReportView = () => {
  return (
    <div className="space-y-6">
      <Henrey />
      <div>
        <LicenReports />
        <div className="mt-8">
          <CoursesTable variant="report" />
        </div>
      </div>
    </div>
  );
};

export default LicenseReportView;
