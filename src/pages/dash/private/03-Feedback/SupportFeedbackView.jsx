import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '../../../../components/ui';

const SupportFeedbackView = () => {
  const navigate = useNavigate();
  const [reply, setReply] = useState('');

  // Sample ticket data
  const ticket = {
    id: '1234',
    subject: 'Access Issue - "Functionality is Restricted" Message On Login',
    description:
      'Dear Sir/Madam,\n\nI am experiencing an issue when logging into my hosting account using the email address example@gmail.com. Upon logging in, I receive the following message:\n\n"Functionality is restricted."\n\nCould you please investigate and resolve this issue as soon as possible?\n\nThank you for your support\n\nBest regards,',
    details: {
      requestType: 'Livello 1',
      priority: 'Critical',
      createdAt: 'GG/MM/AAAA 20:44:58',
      assignedTo: 'Jane Cooper',
    },
    conversation: [
      {
        id: 1,
        author: 'Jane Cooper',
        timestamp: 'GG/MM/AAAA',
        message:
          'Thanks for sharing.\nWe have shared you full root access to the server.\nHope your issue is resolved now.',
      },
      {
        id: 2,
        author: 'Jane Cooper',
        timestamp: 'GG/MM/AAAA',
        message:
          'Please find the screen shot what I am facing when login. Attachment 1754494325.jpg',
      },
    ],
  };

  const handleSendReply = () => {
    if (!reply.trim()) {
      alert('Inserisci una risposta');
      return;
    }
    console.log('Reply sent:', reply);
    setReply('');
    alert('Risposta inviata!');
  };

  return (
    <div className="">
      <div className="">
        <div className="relative mb-8 flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-[#2f2f2f] transition hover:text-black"
            aria-label="Torna indietro"
          >
            <FaArrowLeft size={18} />
          </button>
          <h1 className="text-[26px] font-semibold text-[#202020] md:text-[34px]">
            Area ticket
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-5">
            <section className="rounded-md border border-[#e4e4e4] bg-white p-5 md:p-6">
              <h2 className="mb-4 text-[20px] font-semibold text-[#262626] md:text-[30px]">
                Descrizione ticket
              </h2>
              <p className="text-[12px] leading-relaxed whitespace-pre-line text-[#333] md:text-[16px]">
                {ticket.description}
              </p>
            </section>

            <section className="rounded-md border border-[#e4e4e4] bg-white p-5 md:p-6">
              <h2 className="mb-2 text-[20px] font-semibold text-[#262626] md:text-[30px]">
                Conversazione
              </h2>
              <div className="mb-3 border-t border-[#ececec] pt-3 text-[11px] text-[#5a5a5a] md:text-[14px]">
                Update GG/MM/AAAA 13:32:49
              </div>

              <div className="space-y-4">
                {ticket.conversation.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#b9c6cf] text-xs font-semibold text-white">
                      {msg.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-[#222] md:text-[16px]">
                        {msg.author}
                      </p>
                      <p className="mb-1 text-[10px] text-[#9a9a9a] md:text-[12px]">
                        {msg.timestamp}
                      </p>
                      <div className="rounded-md bg-[#edf6f1] p-3">
                        <p className="text-[11px] whitespace-pre-line text-[#2f2f2f] md:text-[14px]">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-[24px] font-semibold text-[#262626] md:text-[32px]">
                Rispondi
              </h2>
              <textarea
                placeholder="Inserisci la tua risposta..."
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-lg border border-[#ebf3ef] bg-[#edf6f1] px-4 py-3 text-[13px] placeholder:text-[#96a29d] focus:outline-none"
              />
              <div className="mt-4">
                <Button
                  label="Invia"
                  className="rounded-full bg-[#73BFA1] hover:bg-[#5fa488]"
                  onClick={handleSendReply}
                />
              </div>
            </section>
          </div>

          <aside>
            <div className="rounded-md border border-[#e4e4e4] bg-white p-5 md:p-6">
              <h2 className="mb-4 text-[20px] font-semibold text-[#262626] md:text-[30px]">
                Dettagli ticket
              </h2>
              <div className="space-y-2 text-[12px] leading-relaxed text-[#2f2f2f] md:text-[16px]">
                <p>
                  <span className="font-semibold">ID:</span> {ticket.id}
                </p>
                <p>
                  <span className="font-semibold">Oggetto:</span>{' '}
                  {ticket.subject}
                </p>
                <p>
                  <span className="font-semibold">Tipologia richiesta:</span>{' '}
                  {ticket.details.requestType}
                </p>
                <p>
                  <span className="font-semibold">Priorita:</span>{' '}
                  {ticket.details.priority}
                </p>
                <p>
                  <span className="font-semibold">Creato il:</span>{' '}
                  {ticket.details.createdAt}
                </p>
                <p>
                  <span className="font-semibold">Nominativo:</span>{' '}
                  {ticket.details.assignedTo}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SupportFeedbackView;
