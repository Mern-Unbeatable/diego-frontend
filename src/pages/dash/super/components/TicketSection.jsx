import React, { useState, useMemo } from 'react';
import {
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  Calendar,
  User,
  Tag,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import TicketCard from './TicketCard';
import TicketDetailModal from './TicketDetailModal';

// Mock data for tickets
const demoTickets = [
  {
    id: 1,
    title: 'Problema di accesso al corso',
    description: 'Non riesco ad accedere al corso di sicurezza sul lavoro',
    status: 'aperto',
    priority: 'alta',
    type: 'Pagamenti/PayPal',
    author: 'Michael Johnson (v1)',
    authorEmail: 'michael.johnson@email.com',
    createdAt: '2024-11-01T10:30:00Z',
    updatedAt: '2024-11-01T10:30:00Z',
    assignedTo: null,
    comments: 2,
    category: 'Accesso Corsi',
  },
  {
    id: 1,
    title: 'Problema di accesso al corso',
    description: 'Errore durante il pagamento con PayPal',
    status: 'aperto',
    priority: 'media',
    type: 'Pagamenti/PayPal',
    author: 'Michael Johnson (v2)',
    authorEmail: 'michael.johnson2@email.com',
    createdAt: '2024-10-30T15:45:00Z',
    updatedAt: '2024-10-31T09:20:00Z',
    assignedTo: 'Admin',
    comments: 5,
    category: 'Pagamenti',
  },

  {
    id: 3,
    title: 'Sicurezza sul lavoro - Modulo avanzato',
    description:
      'Corso completo sulla sicurezza sul lavoro con focus sulle normative del 2025',
    status: 'in_attesa',
    priority: 'media',
    type: 'Corso in Approvazione',
    author: 'David Brown',
    authorEmail: 'david.brown@email.com',
    createdAt: '2024-01-08T18:00:00Z',
    updatedAt: '2024-01-08T18:00:00Z',
    assignedTo: null,
    comments: 0,
    category: 'Corsi',
  },
  {
    id: 4,
    title: 'Fondamenti di marketing digitale',
    description: 'Corso base di marketing digitale per aziende moderne',
    status: 'approvato',
    priority: 'media',
    type: 'Corso Approvato',
    author: 'Emma Davis',
    licensee: 'Emma Davis',
    authorEmail: 'emma.davis@email.com',
    createdAt: '2025-01-07T22:45:00Z',
    updatedAt: '2025-01-07T22:45:00Z',
    approvedAt: '2025-01-07T22:45:00Z',
    assignedTo: null,
    comments: 0,
    category: 'Corsi',
  },
];


export default function TicketSection({ activeTab = 'panoramica' }) {
  const [tickets, setTickets] = useState(demoTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleMarkInProgress = (ticketId) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'in_corso' } : ticket,
      ),
    );
    setIsModalOpen(false);
  };

  const handleSaveResponse = (ticketId, response) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
            ...ticket,
            risposte: [
              ...(ticket.risposte || []),
              {
                testo: response,
                data: new Date().toLocaleDateString('it-IT'),
                autore: 'Admin',
              },
            ],
          }
          : ticket,
      ),
    );
  };

  // Filter tickets based on active tab
  const filteredTickets = useMemo(() => {
    switch (activeTab) {
      case 'aperti':
        return tickets.filter((t) => t.status === 'aperto');
      case 'chiusi':
        return tickets.filter((t) => t.status === 'chiuso');
      case 'attesa':
        return tickets.filter((t) => t.status === 'in_attesa');
      case 'approvati':
        return tickets.filter((t) => t.status === 'approvato');
      case 'panoramica':
      default:
        return tickets;
    }
  }, [tickets, activeTab]);

  const handleUpdateTicket = (ticketId, updates) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket,
      ),
    );
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
  };

  if (activeTab === 'panoramica') {
    return (
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-800">
          Azioni richieste
        </h2>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {/* First ticket with red dot */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-red-600">
                  Tickets con priorità alta
                </span>
              </div>
              <button className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600">
                Aperto
              </button>
            </div>

            <div className="px-6 py-3">
              <div>
                <h3 className="mb-1 font-medium text-gray-900">
                  Problema di accesso al corso
                </h3>
                <p className="text-sm text-gray-600">Pagamenti/PayPal</p>
              </div>
            </div>

            {/* Second ticket with orange dot */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium text-orange-600">
                  Corsi richiesti di approvazione
                </span>
              </div>
              <button className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white hover:bg-orange-600">
                Attesa
              </button>
            </div>

            <div className="px-6 py-3">
              <div>
                <h3 className="mb-1 font-medium text-gray-900">
                  Problema di accesso al corso
                </h3>
                <p className="text-sm text-gray-600">Pagamenti/PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special layout for "In attesa di approvazione" tab
  if (activeTab === 'attesa') {
    return (
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          In attesa di approvazione
        </h2>

        {filteredTickets.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-6 h-40 w-40">
              <div className="relative">
                <div className="absolute inset-0 rotate-3 transform rounded-lg bg-blue-100 opacity-30"></div>
                <div className="absolute inset-0 translate-x-2 translate-y-1 -rotate-2 transform rounded-lg bg-blue-200 opacity-50"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-blue-300">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500 bg-white">
                      <div className="relative">
                        <div className="mb-1 flex space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="h-3 w-6 rotate-180 transform rounded-t-full border-2 border-b-0 border-blue-500"></div>
                      </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 h-6 w-6 rotate-45 transform rounded-full border-4 border-blue-500 bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Nessun ticket in attesa
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((item) => (
              <div key={item.id} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(item.createdAt).toLocaleDateString('it-IT')}{' '}
                          {new Date(item.createdAt).toLocaleTimeString(
                            'it-IT',
                            { hour: '2-digit', minute: '2-digit' },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex items-center space-x-3">
                    <button
                      onClick={() =>
                        handleUpdateTicket(item.id, { status: 'approvato' })
                      }
                      className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                    >
                      Approva
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(item.id)}
                      className="rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      Cancella
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Special layout for "Corsi approvati" tab
  if (activeTab === 'approvati') {
    return (
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Corsi approvati (1)
        </h2>

        {filteredTickets.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-6 h-40 w-40">
              <div className="relative">
                <div className="absolute inset-0 rotate-3 transform rounded-lg bg-blue-100 opacity-30"></div>
                <div className="absolute inset-0 translate-x-2 translate-y-1 -rotate-2 transform rounded-lg bg-blue-200 opacity-50"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-blue-300">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500 bg-white">
                      <div className="relative">
                        <div className="mb-1 flex space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="h-3 w-6 rotate-180 transform rounded-t-full border-2 border-b-0 border-blue-500"></div>
                      </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 h-6 w-6 rotate-45 transform rounded-full border-4 border-blue-500 bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Nessun corso approvato
            </h3>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Titolo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Licenziataria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Data di approvazione
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredTickets.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {course.licensee || course.author}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {new Date(
                        course.approvedAt || course.updatedAt,
                      ).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                      ,{' '}
                      {new Date(
                        course.approvedAt || course.updatedAt,
                      ).toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Get tab title based on active tab
  const getTabTitle = () => {
    switch (activeTab) {
      case 'aperti':
        return 'Biglietti aperti';
      case 'chiusi':
        return 'Biglietti chiusi';
      case 'attesa':
        return 'In attesa di approvazione';
      case 'approvati':
        return 'Corsi approvati';
      default:
        return 'Biglietti';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'aperto':
        return (
          <span className="inline-flex rounded bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
            Attallone
          </span>
        );
      case 'in_attesa':
        return (
          <span className="inline-flex rounded bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
            Attallone
          </span>
        );
      case 'chiuso':
        return (
          <span className="inline-flex rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
            Chiuso
          </span>
        );
      case 'approvato':
        return (
          <span className="inline-flex rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            Approvato
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'alta':
        return <span className="font-medium text-red-600">Alta</span>;
      case 'media':
        return <span className="font-medium text-orange-600">Media</span>;
      case 'bassa':
        return <span className="font-medium text-blue-600">Bassa</span>;
      default:
        return <span className="text-gray-600">-</span>;
    }
  };

  return (
    <div>
      {/* Header with title and count */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          {getTabTitle()} ({filteredTickets.length})
        </h2>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {filteredTickets.length === 0 ? (
          <div className="py-24 text-center">
            {/* Custom Empty State Illustration */}
            <div className="mx-auto mb-6 h-40 w-40">
              <div className="relative">
                {/* Document stack background */}
                <div className="absolute inset-0 rotate-3 transform rounded-lg bg-blue-100 opacity-30"></div>
                <div className="absolute inset-0 translate-x-2 translate-y-1 -rotate-2 transform rounded-lg bg-blue-200 opacity-50"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-blue-300">
                  {/* Magnifying glass with sad face */}
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500 bg-white">
                      {/* Sad face */}
                      <div className="relative">
                        <div className="mb-1 flex space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="h-3 w-6 rotate-180 transform rounded-t-full border-2 border-b-0 border-blue-500"></div>
                      </div>
                    </div>
                    {/* Magnifying glass handle */}
                    <div className="absolute -right-2 -bottom-2 h-6 w-6 rotate-45 transform rounded-full border-4 border-blue-500 bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="mb-2 text-lg font-medium text-gray-900">
              {activeTab === 'chiusi'
                ? 'Nessun biglietto chiuso'
                : activeTab === 'attesa'
                  ? 'Nessun ticket in attesa'
                  : activeTab === 'approvati'
                    ? 'Nessun corso approvato'
                    : 'Nessun ticket'}
            </h3>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Utente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Priorità
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Azione
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    TK{String(ticket.id).padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {ticket.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {getPriorityBadge(ticket.priority)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        title="Visualizza"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600"
                        title="Elimina"
                        onClick={() => handleDeleteTicket(ticket.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
        onMarkInProgress={handleMarkInProgress}
        onSaveResponse={handleSaveResponse}
      />
    </div>
  );
}
