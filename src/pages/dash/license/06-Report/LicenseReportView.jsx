import React from 'react';
import Henrey from '../01-Home/components/Henrey';
import CoursesTable from '../01-Home/components/CoursesTable';
import LicenReports from './components/LicenReports';

const LicenseReportView = () => {
  return (
    <>
      <Henrey />
      <LicenReports />
      <CoursesTable variant="report" />
    </>
  );
};

export default LicenseReportView;
