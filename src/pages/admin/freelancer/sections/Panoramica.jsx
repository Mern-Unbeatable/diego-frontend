import React, { useState, useEffect } from 'react';
import { Euro, Users, BookOpen, UserCheck, Ticket } from 'lucide-react';

const Panoramica = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/dashboard/panoramica');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
      // Mock data for demonstration
      setDashboardData({
        totaleSales: {
          value: 1250,
          change: 12.5
        },
        newUsers: {
          value: 45,
          weeklyIncrease: 8
        },
        courses: {
          current: 5,
          total: 10,
          percentage: 50
        },
        activeStudents: {
          current: 85,
          total: 200,
          percentage: 42.5
        },
        tickets: {
          value: 1
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Panoramica</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-gray-200 p-6 h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="w-full p-6">
        <div className="rounded-xl bg-red-50 p-6 text-center">
          <p className="text-red-600">Error loading dashboard data</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 lg:py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Panoramica</h2>
        <button className="text-base font-medium text-gray-600 hover:text-gray-900">
          Vedi tutti
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Totale venduto */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <Euro className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Totale venduto
          </h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            €{dashboardData?.totaleSales?.value.toLocaleString()}
          </p>
          <p className="text-sm text-green-600">
            +{dashboardData?.totaleSales?.change}%
          </p>
        </div>

        {/* Nuovi utenti */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Nuovi utenti
          </h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.newUsers?.value}
          </p>
          <p className="text-sm text-gray-500">
            +{dashboardData?.newUsers?.weeklyIncrease} questa settimana
          </p>
        </div>

        {/* I miei corsi */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">
            I miei corsi
          </h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.courses?.current}/{dashboardData?.courses?.total}
          </p>
          <p className="text-sm text-gray-500">
            {dashboardData?.courses?.percentage}% di spazio utilizzato
          </p>
        </div>

        {/* Corsisti attivi */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Corsisti attivi
          </h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.activeStudents?.current}/{dashboardData?.activeStudents?.total}
          </p>
          <p className="text-sm text-gray-500">
            {dashboardData?.activeStudents?.percentage}% di capacità
          </p>
        </div>

        {/* I miei ticket */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">
            I miei ticket
          </h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.tickets?.value.toString().padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Panoramica;