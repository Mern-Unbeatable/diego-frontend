import { ArrowLeft, CloudUpload } from 'lucide-react';
import { useState } from 'react';

const AddTicketModal = ({ open, onClose }) => {
    const [descriptionLength, setDescriptionLength] = useState(0);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#111111]/35 p-4 sm:p-8">
            <section className="w-full max-w-[980px] rounded-xl border border-[#e7e7e7] bg-white p-5 sm:p-8">
                <button type="button" onClick={onClose} className="inline-flex text-[#2f2f2f]">
                    <ArrowLeft size={20} />
                </button>

                <h2 className="mb-7 mt-1 text-center text-2xl font-semibold text-[#202020]">Apri un ticket</h2>

                <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                    <label className="block">
                        <span className="mb-1.5 block text-lg font-medium text-[#1f1f1f]">
                            Oggetto<span className="text-[#e04f3e]">*</span>
                        </span>
                        <input
                            className="h-12 w-full rounded-lg border border-transparent bg-[#edf6f2] px-4 text-sm outline-none placeholder:text-[#9aa8a4] focus:border-[#73bfa1]"
                            placeholder="Inserisci una breve descrizione"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-1.5 block text-lg font-medium text-[#1f1f1f]">
                            Descrizione<span className="text-[#e04f3e]">*</span>
                        </span>
                        <textarea
                            rows={5}
                            maxLength={2000}
                            onChange={(event) => setDescriptionLength(event.target.value.length)}
                            className="w-full rounded-lg border border-transparent bg-[#edf6f2] p-4 text-sm outline-none placeholder:text-[#9aa8a4] focus:border-[#73bfa1]"
                            placeholder="Descrivici quale problema hai riscontrato"
                        />
                        <p className="mt-2 text-right text-sm text-[#7f7f7f]">{descriptionLength}/2000</p>
                    </label>

                    <section className="rounded-lg bg-[#edf6f2] p-4">
                        <div className="rounded-md border border-dashed border-[#c7d9d2] bg-white px-4 py-12 text-center">
                            <CloudUpload className="mx-auto text-[#73bfa1]" size={35} />
                            <p className="mt-3 text-lg font-semibold text-[#222222]">Allega dei file</p>
                            <p className="mt-1 text-sm text-[#7d7d7d]">Trascina e rilascia oppure clicca qui per caricare i file</p>
                        </div>
                        <p className="mt-3 text-sm text-[#737373]">Dimensioni massime permesse: massimo 20 MB per allegato.</p>
                    </section>

                    <div className="flex justify-end gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-[#ed6f63] px-7 py-2 text-sm font-semibold text-[#e15241] hover:bg-[#fff5f4]"
                        >
                            Annulla
                        </button>
                        <button type="button" onClick={onClose} className="rounded-full bg-[#73bfa1] px-8 py-2 text-sm font-semibold text-white">
                            Invia
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddTicketModal;