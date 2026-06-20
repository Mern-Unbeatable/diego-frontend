import React, { useState } from 'react';
import AddCourseModal from './src/pages/admin/super/components/AddCourseModal';

function TestQuizIntegration() {
  const [showModal, setShowModal] = useState(true);

  const handleSave = (courseData) => {
    console.log('Course data saved:', courseData);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setShowModal(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Open Course Modal
      </button>

      <AddCourseModal
        isOpen={showModal}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
}

export default TestQuizIntegration;
