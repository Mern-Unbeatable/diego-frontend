'use client';

import { CheckCircle2 } from 'lucide-react';
import WorkflowSection from './WorkflowSection';
import { courses, howitWorks } from '../../data/courseData';
export default function CourseOverview() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h1 className="mb-8 text-2xl font-bold text-gray-800 sm:text-3xl">
        Panoramica dei corsi
      </h1>

      {/* Table Section */}
      <div className="mb-12 rounded-lg bg-white p-3 shadow-sm sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Corso
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Descrizione
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Durata
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Tipo
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {course.name}
                  </td>
                  <td className="mx-auto max-w-[260px] px-4 py-4 text-sm leading-6 break-words whitespace-normal text-gray-600">
                    {course.description}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {course.duration}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {course.type}
                  </td>
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
          <div className="relative h-full w-full">
            <img
              src="images/course/catalog4.png"
              alt="Team working together"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-[#73BFA1] p-2 text-white">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Come funziona
            </h2>
          </div>

          <ol className="space-y-3">
            {howitWorks.map((step, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-relaxed text-gray-700"
              >
                <span className="flex-shrink-0 font-bold text-[#73BFA1]">
                  {index + 1}.
                </span>
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
