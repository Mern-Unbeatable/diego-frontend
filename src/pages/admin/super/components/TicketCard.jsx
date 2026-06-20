import React from 'react';

export default function TicketCard({ ticket, onUpdate, onDelete }) {
  const getStatusButton = () => {
    switch (ticket.status) {
      case 'aperto':
        return (
          <button className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600">
            Aperto
          </button>
        );
      case 'in_attesa':
        return (
          <button className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white hover:bg-orange-600">
            Attesa
          </button>
        );
      case 'chiuso':
        return (
          <button className="rounded-full bg-gray-500 px-3 py-1 text-xs font-medium text-white hover:bg-gray-600">
            Chiuso
          </button>
        );
      case 'approvato':
        return (
          <button className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white hover:bg-green-600">
            Approvato
          </button>
        );
      default:
        return null;
    }
  };

  const getStatusDot = () => {
    switch (ticket.status) {
      case 'aperto':
        return 'bg-red-500';
      case 'in_attesa':
        return 'bg-orange-500';
      case 'chiuso':
        return 'bg-gray-500';
      case 'approvato':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (ticket.status) {
      case 'aperto':
        return 'Tickets con priorità alta';
      case 'in_attesa':
        return 'Corsi richiesti di approvazione';
      case 'chiuso':
        return 'Ticket risolto';
      case 'approvato':
        return 'Corso approvato';
      default:
        return 'Ticket';
    }
  };

  return (
    <div className="mb-4 rounded-lg bg-white shadow-sm">
      <div className="divide-y divide-gray-100">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className={`h-2 w-2 ${getStatusDot()} rounded-full`}></div>
            <span className="text-sm font-medium text-gray-600">
              {getStatusText()}
            </span>
          </div>
          {getStatusButton()}
        </div>

        <div className="px-6 py-3">
          <div>
            <h3 className="mb-1 font-medium text-gray-900">{ticket.title}</h3>
            <p className="text-sm text-gray-600">{ticket.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
