import { ArrowLeft, SendHorizontal, UsersRound } from 'lucide-react';

const TicketDetailsModal = ({ open, ticket, onClose }) => {
    if (!open || !ticket) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/35 p-4 sm:p-8">
            <section className="mx-auto max-w-[1280px] rounded-xl bg-white p-5 sm:p-8">
                <button type="button" onClick={onClose} className="inline-flex text-[#2f2f2f]">
                    <ArrowLeft size={20} />
                </button>

                <h2 className="mb-6 mt-1 text-center text-lg font-semibold text-[#202020]">Area ticket</h2>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
                    <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
                        <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Descrizione ticket</h3>
                        <div className="space-y-4 text-sm text-[#3e3e3e]">
                            <p>Dear Sir/Madam,</p>
                            <p>
                                {ticket.message}
                            </p>
                            <p className="font-semibold">"Functionality is restricted."</p>
                            <p>Could you please investigate and resolve this issue as soon as possible?</p>
                            <p>Thank you for your support</p>
                            <p>Best regards,</p>
                        </div>
                    </article>

                    <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
                        <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Ticket Details</h3>
                        <div className="space-y-3 text-sm text-[#3f3f3f]">
                            <p><span className="font-semibold">ID:</span> {ticket.id}</p>
                            <p><span className="font-semibold">Oggetto:</span> {ticket.subject}</p>
                            <p><span className="font-semibold">Tipologia richiedente:</span> {ticket.requesterLevel}</p>
                            <p><span className="font-semibold">Priorita:</span> {ticket.priority}</p>
                            <p><span className="font-semibold">Creato il:</span> {ticket.createdAt}</p>
                            <p><span className="font-semibold">Nominativo:</span> {ticket.requester}</p>
                        </div>
                    </article>
                </div>

                <article className="mt-5 rounded-xl border border-[#e8e8e8] bg-white p-5">
                    <h3 className="mb-5 border-b border-[#ececec] pb-4 text-lg font-semibold text-[#1f1f1f]">Conversazione</h3>
                    <p className="mb-4 text-sm text-[#757575]">Update GG/MM/AAAA 13:32:49</p>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b]">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                                    <UsersRound size={14} />
                                </span>
                                Jane Cooper
                            </p>
                            <p className="text-sm text-[#8f8f8f]">GG/MM/AAAA</p>
                            <div className="max-w-[630px] rounded-md bg-[#edf5f2] p-3 text-sm text-[#4e4e4e]">
                                Thanks for sharing. We have shared you full root access to the server. Hope you issue is resolved now...
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b]">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                                    <UsersRound size={14} />
                                </span>
                                Jane Cooper
                            </p>
                            <p className="text-sm text-[#8f8f8f]">GG/MM/AAAA</p>
                            <div className="max-w-[630px] rounded-md bg-[#edf5f2] p-3 text-sm text-[#4e4e4e]">
                                Please find the screen shot what i am facing when login Attachment 1754493425.jpg
                            </div>
                        </div>
                    </div>
                </article>

                <section className="mt-6 space-y-3">
                    <h3 className="text-lg font-semibold text-[#1f1f1f]">Rispondi</h3>
                    <textarea
                        rows={4}
                        className="w-full max-w-[800px] rounded-lg border border-transparent bg-[#edf5f2] p-4 text-sm outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1]"
                        placeholder="Inserisci la tua risposta..."
                    />
                    <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white">
                        <SendHorizontal size={14} /> Invia
                    </button>
                </section>
            </section>
        </div>
    );
};

export default TicketDetailsModal;