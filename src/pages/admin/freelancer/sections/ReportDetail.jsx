import React, { useState, useEffect } from 'react';
import { Search, Download, Send, Edit2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';

const ReportDetail = () => {
  const { courseId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const studentsPerPage = 6;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch('/fakeData/freelancer.json');
        const data = await response.json();
        
        const course = data.courses.find(c => c.id === parseInt(courseId));
        
        if (course) {
          setCourseTitle(course.title);
          // Convert progress strings to numbers
          const studentsData = course.students.map((student, index) => ({
            id: index + 1,
            name: student.name,
            startDate: student.start_date,
            email: student.email,
            progress: parseInt(student.progress)
          }));
          setStudents(studentsData);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const totalStudents = students.length;
  
  // Paginate students
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + studentsPerPage);

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-[#73BFA1]';
    if (progress >= 50) return 'bg-[#73BFA1]';
    if (progress >= 25) return 'bg-[#73BFA1]';
    return 'bg-gray-300';
  };

  if (loading) {
    return (
      <div className="w-full py-6 lg:py-10 bg-white rounded-xl">
        <div className="animate-pulse px-6 lg:px-10">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 lg:py-10  rounded-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Studenti iscritti - {courseTitle}</h2>
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#f0f0f0] border-y border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Corsista
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Data di inizio  
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                E-mail utilizzata
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Avanzamento
              </th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-900">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedStudents.map((student) => (
              <tr key={student.id} className="bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-base text-gray-900 font-normal">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-base text-gray-900">
                  {student.startDate}
                </td>
                <td className="px-6 py-4 text-base text-gray-900">
                  {student.email}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden bg-[#eaf5f1] rounded-full">
                      <div
                        className={`h-full ${getProgressColor(student.progress)} transition-all`}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900 font-normal min-w-[45px]">
                      {student.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Edit Button */}
                    <button className="flex px-6 py-2 items-center justify-center rounded-full  bg-[#f0f0f0] transition-colors">
                      <RiEdit2Line className="h-5 w-5 text-gray-700" />
                    </button>
                    {/* Action Button */}
                    <button className="flex items-center justify-center rounded-full bg-[#73BFA1] hover:bg-[#5fa889] transition-colors h-10 px-6 py-2 gap-2">
                      {student.progress === 100 ? (
                        <>
                          <Download className="h-4 w-4 text-white" />
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-white" />
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between px-6 lg:px-10">
        <p className="text-sm text-neutral-500">
          Mostra {Math.min(startIndex + studentsPerPage, totalStudents)} di {totalStudents} corsisti
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Precedente
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
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
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prossimo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;