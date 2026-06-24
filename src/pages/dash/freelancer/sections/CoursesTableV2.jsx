import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';

const CoursesTableV2 = ({ courses = [], loading = false }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleCourseClick = (courseId) => {
    navigate(`/dash/courses/${courseId}`);
  };

  const getStatusColor = (status) => {
    if (status === 'Pubblicato') return 'bg-green-100 text-green-700';
    if (status === 'In approvazione') return 'bg-blue-100 text-blue-700';
    if (status === 'Non approvato') return 'bg-red-100 text-red-700';
    if (status === 'In immatricolazione' || status === 'In manutenzione') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(courses.length / 5);
  const displayedCourses = courses.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="mb-6 text-3xl font-bold text-black">I miei corsi</h2>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white">
        <table className="w-full">
          <thead className="bg-[#f0f0f0]">
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Titolo corso
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Data di pubblicazione
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Iscritti
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Stato
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Azione
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-base font-normal text-black">
                  <button 
                    onClick={() => handleCourseClick(course.id)}
                    className="text-left hover:text-[#73BFA1] hover:underline transition-colors font-medium"
                  >
                    {course.title}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-normal text-black">
                  {course.published_date}
                </td>
                <td className="px-6 py-4 text-sm font-normal text-black">
                  {course.enrolled}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      <RiEdit2Line className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-700 transition-colors">
                      <AiOutlineDelete className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <div className="text-sm text-gray-600">
            Showing {Math.min(displayedCourses.length, courses.length)} of {courses.length} courses
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Precedente
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-[#73BFA1] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prossimo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesTableV2;