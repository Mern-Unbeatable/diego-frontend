import React, { useState } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  ChevronRight,
  PlayCircle,
  Award,
  TrendingUp,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  User,
  Menu,
  X,
} from 'lucide-react';

const CourseHomeView = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const courses = [];

  // Filter courses based on active tab and search
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'in-progress' &&
        course.progress > 0 &&
        course.progress < 100) ||
      (activeTab === 'completed' && course.progress === 100) ||
      (activeTab === 'not-started' && course.progress === 0);
    return matchesSearch && matchesTab;
  });

  const stats = [];

  return (
    <div className="">
      {/* Mobile Search - Below Header */}
      <div className="border-b border-gray-200 bg-white p-4 md:hidden">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <main className="">
        {/* Stats Section */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-1 flex items-center justify-between">
                <stat.icon className={`${stat.color}`} size={22} />
                <span className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {['all', 'in-progress', 'completed', 'not-started'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
              >
                {tab === 'all'
                  ? 'All Courses'
                  : tab === 'in-progress'
                    ? 'In Progress'
                    : tab === 'completed'
                      ? 'Completed'
                      : 'Not Started'}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-sm ${activeTab === tab
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {tab === 'all'
                    ? courses.length
                    : tab === 'in-progress'
                      ? courses.filter(
                        (c) => c.progress > 0 && c.progress < 100,
                      ).length
                      : tab === 'completed'
                        ? courses.filter((c) => c.progress === 100).length
                        : courses.filter((c) => c.progress === 0).length}
                </span>
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">📚</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              No courses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Course Image */}
                <div
                  className={`relative h-48 bg-gradient-to-r ${course.color}`}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    {course.level}
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                    <span className="rounded-lg bg-black/30 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1 rounded-lg bg-black/30 px-3 py-1 backdrop-blur-sm">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-medium text-white">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5">
                  <h3 className="mb-2 line-clamp-2 cursor-pointer text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600">
                    {course.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-500">
                    by {course.instructor}
                  </p>

                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between text-sm font-medium">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-800">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full bg-gradient-to-r ${course.color} transition-all duration-500`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {course.progress === 0 ? (
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700">
                        <PlayCircle size={18} />
                        Start Course
                      </button>
                    ) : course.progress === 100 ? (
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-green-700">
                        <Award size={18} />
                        View Certificate
                      </button>
                    ) : (
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700">
                        <BarChart3 size={18} />
                        Continue
                      </button>
                    )}
                    <button className="rounded-lg border border-gray-200 p-2.5 transition-colors hover:bg-gray-50">
                      <ChevronRight size={18} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseHomeView;
