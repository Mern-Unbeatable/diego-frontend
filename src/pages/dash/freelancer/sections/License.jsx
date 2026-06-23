import React from 'react';
import Henrey from '../components/Henrey';
import LicenseComponent from '../components/LicenseComponent';

const License = () => {
    return (
        <div className='py-6 '>
            <h1 className='text-xl font-medium text-center mb-10'>Utente licenza</h1>
            <Henrey />
            <LicenseComponent />
        </div>
    );
};

export default License;