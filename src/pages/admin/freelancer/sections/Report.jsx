import React, { useState, useEffect } from 'react';
import Henrey from '../components/Henrey';
import DateFilterButton from '../components/DateFilterButton';
import CoursesTableV2 from './CoursesTableV2';
import LicenReportsView from '../components/LicenReportsView';

const Report = () => {
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
        <div className=''>
            <Henrey />

            <LicenReportsView />
            <CoursesTableV2 courses={coursesData} loading={loading} />
        </div>
    );
};


export default Report;