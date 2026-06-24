import { ArrowLeft, CloudUpload } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyOpenTicketView = () => {
    return (

        <section className="mx-auto max-w-[980px] rounded-xl border border-[#ebebeb] bg-white p-5 sm:p-7">
            <Link to="/dashboard/company-admin/ticket" className="inline-flex text-[#2c2c2c]">
                <ArrowLeft size={20} />
            </Link>

            <h2 className="mb-7 mt-2 text-center text-[38px] font-semibold text-[#1f1f1f]">Apri un ticket</h2>

            <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                <label className="block">
                    <span className="mb-1.5 block text-[24px] font-medium text-[#202020]">
                        Oggetto<span className="text-[#e34f4f]">*</span>
                    </span>
                    <input
                        className="h-12 w-full rounded-lg border border-transparent bg-[#edf5f2] px-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1]"
                        placeholder="Inserisci una breve descrizione"
                    />
                </label>

                <label className="block">
                    <span className="mb-1.5 block text-[24px] font-medium text-[#202020]">
                        Descrizione<span className="text-[#e34f4f]">*</span>
                    </span>
                    <textarea
                        rows={5}
                        className="w-full rounded-lg border border-transparent bg-[#edf5f2] p-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1]"
                        placeholder="Descrivici quale problema hai riscontrato..."
                    />
                    <p className="mt-2 text-right text-sm text-[#7f7f7f]">0/2000</p>
                </label>

                <div className="rounded-lg bg-[#edf5f2] p-4">
                    <div className="rounded-md border border-dashed border-[#b8cbc4] bg-white px-4 py-10 text-center">
                        <CloudUpload className="mx-auto text-[#73bfa1]" size={34} />
                        <p className="mt-3 text-[26px] font-semibold text-[#202020]">Allega del file</p>
                        <p className="mt-1 text-sm text-[#7e7e7e]">Trascina e rilascia oppure clicca qui per caricare i file</p>
                    </div>
                    <p className="mt-3 text-sm text-[#7e7e7e]">Dimensioni massime permesse: massimo 20 MB per allegato.</p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-full border border-[#ef6a59] px-6 py-2 text-sm font-semibold text-[#e14f3f] hover:bg-[#fff3f1]"
                    >
                        Annulla
                    </button>
                    <button
                        type="button"
                        onClick={() => (window.location.href = '/dashboard/company-admin/ticket')}
                        className="rounded-full bg-[#73bfa1] px-7 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
                    >
                        Invia
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CompanyOpenTicketView;
