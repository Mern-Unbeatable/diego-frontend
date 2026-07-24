import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, useToast } from '../../../../components/ui';
import Loading from '../../../../components/ui/Utilities/Loading';
import { usePrivate } from '../../../../features/private/privateHooks';
import TicketTable from './components/TicketTable';
import CreateTicketModal from './components/CreateTicketModal';

const SupportTicketView = () => {
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();
  const { fetchMyTickets, createTicket, tickets, ticketsLoading, ticketsError, createTicketLoading } =
    usePrivate();
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchMyTickets().catch(() => {});
  }, [fetchMyTickets]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      addToast('Sono consentiti solo file immagine', 'error');
      return;
    }

    if (selectedFile.size <= 20 * 1024 * 1024) {
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
    if (!droppedFile) return;

    if (!droppedFile.type.startsWith('image/')) {
      addToast('Sono consentiti solo file immagine', 'error');
      return;
    }

    if (droppedFile.size <= 20 * 1024 * 1024) {
      setFile(droppedFile);
    } else {
      addToast('Il file deve essere massimo 20 MB', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      addToast('Compilare tutti i campi obbligatori', 'error');
      return;
    }

    try {
      await createTicket({
        subject: subject.trim(),
        message: description.trim(),
        attachment: file,
      });

      addToast('Ticket inviato con successo!', 'success');
      handleCloseCreateModal();
      await fetchMyTickets();
    } catch (error) {
      addToast(error || 'Errore durante l\'invio del ticket', 'error');
    }
  };

  const handleCloseCreateModal = () => {
    setSubject('');
    setDescription('');
    setFile(null);
    setIsCreateModalOpen(false);
  };

  const filteredTickets = useMemo(() => {
    const ticketList = Array.isArray(tickets) ? tickets : [];
    if (!search.trim()) return ticketList;

    return ticketList.filter((ticket) => {
      const haystack =
        `${ticket.id} ${ticket.subject} ${ticket.status} ${ticket.message}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [search, tickets]);

  if (ticketsLoading) {
    return <Loading size="md" className="min-h-60" />;
  }

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

      {ticketsError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {ticketsError}
        </div>
      )}

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
        isSubmitting={createTicketLoading}
      />
    </>
  );
};

export default SupportTicketView;
