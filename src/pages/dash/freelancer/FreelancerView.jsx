import React from 'react';
import Henrey from './components/Henrey';
import Panoramica from './sections/Panoramica';
import CoursesTable from './sections/CoursesTable';

const FreelancerView = () => {
    return (
        <div>
            <Henrey />
            <Panoramica />
            <CoursesTable />
        </div>
    );
};


export default FreelancerView;