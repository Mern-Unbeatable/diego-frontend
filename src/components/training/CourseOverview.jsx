'use client';


import { CheckCircle2 } from 'lucide-react';
import WorkflowSection from './WorkflowSection';
import catalog from '../../assets/images/course/catalog4.png';
import { courses, howitWorks } from '../../data/courseData';
export default function CourseOverview() {


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h1 className="mb-8 text-2xl font-bold text-gray-800 sm:text-3xl">Panoramica dei corsi</h1>

      {/* Table Section */}
      <div className="mb-12 rounded-lg bg-white p-3 shadow-sm sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Corso</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Descrizione</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Durata</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700 text-sm font-medium">{course.name}</td>
                <td className="mx-auto max-w-[260px] whitespace-normal break-words px-4 py-4 text-sm leading-6 text-gray-600">
                  {course.description}
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">{course.duration}</td>
                <td className="py-4 px-4 text-gray-700 text-sm">{course.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Come funziona Section */}
      <div className="mb-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left - Image Card */}
        <div className="flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-teal-100 sm:h-72 md:h-80">
          <div className="relative w-full h-full">
            <img
              src={catalog}
              alt="Team working together"

              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#73BFA1] text-white p-2 rounded-full">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">Come funziona</h2>
          </div>

          <ol className="space-y-3">
            {howitWorks.map((step, index) => (
              <li key={index} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                <span className="font-bold text-[#73BFA1] flex-shrink-0">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <WorkflowSection />
        </div>
      </div>

      {/* Process Flow Section */}



    </div>
  );
}
