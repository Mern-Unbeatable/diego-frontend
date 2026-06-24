import React from 'react';
import {
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

export default function TicketStats({ tickets = [] }) {
  // Calculate statistics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === 'aperto').length;
  const closedTickets = tickets.filter((t) => t.status === 'chiuso').length;
  const pendingTickets = tickets.filter((t) => t.status === 'in_attesa').length;
  const approvedTickets = tickets.filter(
    (t) => t.status === 'approvato',
  ).length;

  // Calculate percentages
  const openPercentage =
    totalTickets > 0 ? ((openTickets / totalTickets) * 100).toFixed(1) : 0;
  const closedPercentage =
    totalTickets > 0 ? ((closedTickets / totalTickets) * 100).toFixed(1) : 0;

  // Mock trend data (in a real app this would come from API)
  const trends = {
    total: { value: 12, type: 'up' }, // 12% increase
    open: { value: 5, type: 'down' }, // 5% decrease
    closed: { value: 18, type: 'up' }, // 18% increase
    pending: { value: 2, type: 'down' }, // 2% decrease
    approved: { value: 25, type: 'up' }, // 25% increase
  };

  const getTrendIcon = (trend) => {
    switch (trend.type) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend.type) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const stats = [
    {
      name: 'Totale Ticket',
      value: totalTickets,
      icon: Ticket,
      color: 'bg-blue-500',
      trend: trends.total,
      description: 'Tutti i ticket nel sistema',
    },
    {
      name: 'Ticket Aperti',
      value: openTickets,
      icon: AlertCircle,
      color: 'bg-red-500',
      trend: trends.open,
      description: `${openPercentage}% del totale`,
    },
    {
      name: 'In Attesa',
      value: pendingTickets,
      icon: Clock,
      color: 'bg-orange-500',
      trend: trends.pending,
      description: 'Richiedono attenzione',
    },
    {
      name: 'Chiusi',
      value: closedTickets,
      icon: CheckCircle2,
      color: 'bg-gray-500',
      trend: trends.closed,
      description: `${closedPercentage}% del totale`,
    },
    {
      name: 'Corsi Approvati',
      value: approvedTickets,
      icon: CheckCircle2,
      color: 'bg-green-500',
      trend: trends.approved,
      description: 'Corsi pubblicati',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} `}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  {getTrendIcon(stat.trend)}
                  <span
                    className={`text-sm font-medium ${getTrendColor(stat.trend)}`}
                  >
                    {stat.trend.value}%
                  </span>
                  <span className="text-sm text-gray-500">vs mese scorso</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
