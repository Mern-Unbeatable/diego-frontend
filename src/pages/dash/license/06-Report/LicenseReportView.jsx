import React, { useState, useEffect } from 'react';
import Henrey from '../01-Home/components/Henrey';
import CoursesTableV2 from './components/CoursesTableV2';
import LicenReports from './components/LicenReports';

const LicenseReportView = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFreelancerData();
  }, []);

  const fetchFreelancerData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/fakeData/freelancer.json');
      const data = await response.json();
      setCoursesData(data.courses);
    } catch (error) {
      console.error('Error fetching freelancer data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Henrey />
      <LicenReports />
      <CoursesTableV2 courses={coursesData} loading={loading} />
    </>
  );
};

export default LicenseReportView;
