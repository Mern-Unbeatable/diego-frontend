import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X, Play, Pause } from 'lucide-react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';
import AddCourseModal from '../../super/components/AddCourseModal';

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setCourses([
        {
          id: 1,
          name: 'Seveso Training',
          enrolledStudents: 101,
          progress: 99,
          status: 'Pubblicato',
          description: 'Comprehensive safety training for Seveso industries',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          instructor: 'Dr. Marco Rossi',
          duration: '12 hours',
          level: 'Intermediate',
          category: 'Safety'
        },
        {
          id: 2,
          name: 'General Training',
          enrolledStudents: 102,
          progress: 75,
          status: 'Pubblicato',
          description: 'General workplace safety and compliance training',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          instructor: 'Prof. Anna Bianchi',
          duration: '8 hours',
          level: 'Beginner',
          category: 'Compliance'
        },
        {
          id: 3,
          name: 'Cyber Security',
          enrolledStudents: 106,
          progress: 25,
          status: 'Pubblicato',
          description: 'Advanced cyber security awareness and protection',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          instructor: 'Ing. Luca Verdi',
          duration: '15 hours',
          level: 'Advanced',
          category: 'Technology'
        },
        {
          id: 4,
          name: 'General Training',
          enrolledStudents: 0,
          progress: 0,
          status: 'Immatricolazione',
          description: 'Introductory training for new employees',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          instructor: 'Dott. Maria Gialli',
          duration: '4 hours',
          level: 'Beginner',
          category: 'General'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-[#73BFA1]';
    if (progress >= 50) return 'bg-[#73BFA1]';
    if (progress >= 25) return 'bg-[#73BFA1]';
    return 'bg-gray-300';
  };

  const getStatusColor = (status) => {
    if (status === 'Pubblicato') return 'bg-green-100 text-green-700';
    if (status === 'Immatricolazione') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  const handleSaveCourse = (courseData) => {
    console.log('Course saved:', courseData);
    setIsModalOpen(false);
    fetchCourses();
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
    setIsPlaying(false);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-6 lg:py-10 bg-white rounded-xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6">
          <h2 className="text-2xl font-bold text-gray-900">I miei corsi</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-none">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cerca corsi..."
                  className="h-11 w-full sm:w-64 rounded-full border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#73BFA1] focus:bg-white focus:outline-none transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Add Course Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#73BFA1] px-6 py-3 text-sm font-medium text-white hover:bg-[#5fa889] transition-colors whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Aggiungi nuovo corso
            </button>
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="px-6 mb-4">
            <p className="text-sm text-gray-500">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'corso trovato' : 'corsi trovati'} per "{searchTerm}"
            </p>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden bg-white shadow-sm border border-gray-200">
          <table className="w-full">
            <thead className="bg-[#f0f0f0] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  Corso
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  Corsisti iscritti
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  Avanzamento
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  Stato
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-base text-black font-medium">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 text-base font-normal text-black">
                      {course.enrolledStudents}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full ${getProgressColor(course.progress)} transition-all`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">
                          {course.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Visualizza dettagli"
                        >
                          <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Modifica corso"
                        >
                          <RiEdit2Line className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                        <button
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                          title="Elimina corso"
                        >
                          <AiOutlineDelete className='h-4 w-4 lg:h-5 lg:w-5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-600">Nessun corso trovato</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Prova a modificare i termini di ricerca o aggiungi un nuovo corso
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 flex items-center gap-2 rounded-full bg-[#73BFA1] px-6 py-2 text-sm font-medium text-white hover:bg-[#5fa889] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Aggiungi nuovo corso
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Course Modal */}
      {isModalOpen && (
        <AddCourseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          onSave={handleSaveCourse}
          courseData={selectedCourse}
        />
      )}

      {/* View Course Modal */}
      {isViewModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-[30] flex items-center justify-center bg-[#33584d]/78 p-3 md:p-6">
          <div className="max-h-[96vh] w-full max-w-[900px] overflow-y-auto rounded-2xl bg-white p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#141414]">
                Dettagli Corso
              </h2>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedCourse(null);
                  setIsPlaying(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Course Video */}
            <div className="mb-6 rounded-xl overflow-hidden bg-black relative">
              <video
                className="w-full aspect-video"
                controls={isPlaying}
                src={selectedCourse.videoUrl}
                poster="https://via.placeholder.com/1280x720/73BFA1/FFFFFF?text=Course+Preview"
              />
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-[#73BFA1] ml-1" />
                  </div>
                </button>
              )}
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#141414] mb-4">
                  Informazioni Generali
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nome del Corso</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Descrizione</p>
                    <p className="text-base text-[#141414]">{selectedCourse.description || 'Nessuna descrizione disponibile'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Istruttore</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.instructor || 'Non specificato'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stato</p>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(selectedCourse.status)}`}>
                      {selectedCourse.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#141414] mb-4">
                  Statistiche
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Corsisti Iscritti</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.enrolledStudents}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avanzamento</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full ${getProgressColor(selectedCourse.progress)} transition-all`}
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700">{selectedCourse.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durata</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.duration || 'Non specificato'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Livello</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.level || 'Non specificato'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categoria</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.category || 'Non specificato'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedCourse(null);
                  setIsPlaying(false);
                }}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Chiudi
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditCourse(selectedCourse);
                }}
                className="px-6 py-2 rounded-full bg-[#73BFA1] text-white hover:bg-[#5fa889] transition-colors"
              >
                Modifica Corso
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesTable;