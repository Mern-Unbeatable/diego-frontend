import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, useToast } from '../../../../components/ui';
import TicketTable from './components/TicketTable';
import CreateTicketModal from './components/CreateTicketModal';

const ticketsSeed = [
  {
    id: 1001,
    subject: 'Problema di accesso alla piattaforma',
    createdAt: '08 Lug 2026 14:32',
    status: 'Aperto',
    description: 'Non riesco ad accedere con le mie credenziali standard, ricevo errore 500.',
  },
  {
    id: 1002,
    subject: 'Fattura non ricevuta',
    createdAt: '06 Lug 2026 10:15',
    status: 'In lavorazione',
    description: 'Ho effettuato il pagamento ma non ho ancora ricevuto la fattura via email.',
  },
  {
    id: 1003,
    subject: 'Richiesta informazioni piano Premium',
    createdAt: '04 Lug 2026 09:00',
    status: 'Chiuso',
    description: 'Vorrei maggiori informazioni sulle funzionalità incluse nel piano Premium.',
  },
];

const SupportTicketView = () => {
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(ticketsSeed);
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 20 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      addToast('Il file deve essere massimo 20 MB', 'error');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 20 * 1024 * 1024) {
      setFile(droppedFile);
    } else {
      addToast('Il file deve essere massimo 20 MB', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      addToast('Compilare tutti i campi obbligatori', 'error');
      return;
    }

    const newTicket = {
      id: tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1001,
      subject,
      createdAt: new Date().toLocaleString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Aperto',
      description,
      file: file ? file.name : null,
    };

    setTickets([newTicket, ...tickets]);
    alert('Ticket inviato con successo!');
    handleCloseCreateModal();
  };

  const handleCloseCreateModal = () => {
    setSubject('');
    setDescription('');
    setFile(null);
    setIsCreateModalOpen(false);
  };

  const filteredTickets = useMemo(() => {
    if (!search.trim()) return tickets;
    return tickets.filter((ticket) => {
      const haystack = `${ticket.id} ${ticket.subject} ${ticket.status}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [search, tickets]);

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <TicketTable
        filteredTickets={filteredTickets}
        search={search}
        setSearch={setSearch}
        onViewTicket={(ticket) => navigate(`/dashboard/private-user/ticket/${ticket.id}`)}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />

      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmit}
        subject={subject}
        setSubject={setSubject}
        description={description}
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        handleFileChange={handleFileChange}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />
    </>
  );
};

export default SupportTicketView;



