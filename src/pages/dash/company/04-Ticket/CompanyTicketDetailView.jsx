import { ArrowLeft, SendHorizontal, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyTicketDetailView = () => {
  return (
    <section className="space-y-6">
      <Link
        to="/dashboard/company-admin/ticket"
        className="inline-flex text-[#2c2c2c]"
      >
        <ArrowLeft size={20} />
      </Link>

      <h2 className="text-[40px] font-semibold text-[#1f1f1f]">Area ticket</h2>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
          <h3 className="mb-4 text-[30px] font-semibold text-[#1f1f1f]">
            Descrizione ticket
          </h3>
          <div className="space-y-4 text-sm text-[#3e3e3e]">
            <p>Dear Sir/Madam,</p>
            <p>
              I am experiencing an issue when logging into my hosting account
              using the email address example@gmail.com. Upon logging in, I
              receive the following message:
            </p>
            <p className="font-semibold">"Functionality is restricted."</p>
            <p>
              Could you please investigate and resolve this issue as soon as
              possible? Thank you for your support.
            </p>
            <p>Best regards,</p>
          </div>
        </article>

        <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
          <h3 className="mb-4 text-[30px] font-semibold text-[#1f1f1f]">
            Dettagli ticket
          </h3>
          <div className="space-y-2 text-sm text-[#3f3f3f]">
            <p>
              <span className="font-semibold">ID:</span> 1234
            </p>
            <p>
              <span className="font-semibold">Oggetto:</span> Access Issue -
              "Functionality Is Restricted" Message On Login
            </p>
            <p>
              <span className="font-semibold">Tipologia richiedente:</span>{' '}
              Livello 2
            </p>
            <p>
              <span className="font-semibold">Priorita:</span> Critical
            </p>
            <p>
              <span className="font-semibold">Creato il:</span> GG/MM/AAAA
              20:44:58
            </p>
            <p>
              <span className="font-semibold">Nominativo:</span> Nome utente
            </p>
          </div>
        </article>
      </div>

      <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
        <h3 className="mb-5 border-b border-[#ececec] pb-4 text-[32px] font-semibold text-[#1f1f1f]">
          Conversazione
        </h3>
        <p className="mb-4 text-sm text-[#757575]">
          Update GG/MM/AAAA 13:32:49
        </p>

        <div className="space-y-5">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                <UsersRound size={14} />
              </span>
              Jane Cooper
            </p>
            <p className="text-xs text-[#8f8f8f]">Aug 6, 2025</p>
            <div className="max-w-[630px] rounded-md bg-[#edf5f2] p-3 text-sm text-[#4e4e4e]">
              Thanks for sharing. We have shared your full root access to the
              server. Hope your issue is resolved now.
            </div>
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                <UsersRound size={14} />
              </span>
              Jane Cooper
            </p>
            <p className="text-xs text-[#8f8f8f]">GG/MM/AAAA</p>
            <div className="max-w-[630px] rounded-md bg-[#edf5f2] p-3 text-sm text-[#4e4e4e]">
              Please find the screenshot what i am facing when login Attachment
              1754493425.jpg
            </div>
          </div>
        </div>
      </article>

      <section className="space-y-3">
        <h3 className="text-[32px] font-semibold text-[#1f1f1f]">Rispondi</h3>
        <textarea
          rows={4}
          className="w-full max-w-[800px] rounded-lg border border-transparent bg-[#edf5f2] p-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1]"
          placeholder="Inserisci la tua risposta..."
        />
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
        >
          <SendHorizontal size={14} /> Invia
        </button>
      </section>
    </section>
  );
};

export default CompanyTicketDetailView;
