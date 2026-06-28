import { Download, Printer } from 'lucide-react';

const cards = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  name: 'Mario Rossi',
  learnerId: '020402020',
  course: 'Formazione Generale 4 ore',
}));

const CompanyCertificatesView = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">
        Elenco degli attestati
      </h2>

      <section className="rounded-xl border border-[#e8e8e8] bg-white p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div>
            <p className="mb-1 text-xs font-medium text-[#868686]">Corso</p>
            <select className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none">
              <option>Tutti i corsi</option>
            </select>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-[#868686]">
              Cerca partecipante
            </p>
            <select className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none">
              <option>cerca per nome...</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="h-10 rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8]"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {cards.map((card) => (
          <article key={card.id} className="space-y-4">
            <div className="rounded-xl bg-[#edf5f2] p-5">
              <p className="text-sm text-[#202020]">
                <span className="font-semibold">Nominativo utente:</span>{' '}
                {card.name}
              </p>
              <p className="mt-1 text-sm text-[#202020]">
                <span className="font-semibold">ID corsista:</span>{' '}
                {card.learnerId}
              </p>
              <p className="mt-1 text-sm text-[#202020]">
                <span className="font-semibold">Corso:</span> {card.course}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-[#23473f]">
              <img
                src="/image/student/c_1.png"
                alt="Certificato"
                className="h-[200px] w-full object-cover opacity-80"
                onError={(event) => {
                  event.currentTarget.src = '/images/icons/title.png';
                  event.currentTarget.className =
                    'h-[200px] w-full object-contain bg-[#1f3f38] p-8';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
              >
                <Printer size={14} /> Stampa
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
              >
                <Download size={14} /> Scarica
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className="flex flex-wrap items-center justify-between border-t border-[#ececec] pt-4 text-sm text-[#7d7d7d]">
        <p>Mostra 6 di 16 certificati</p>
        <div className="flex items-center gap-4">
          <button type="button">Precedente</button>
          <button
            type="button"
            className="h-6 w-6 rounded bg-[#73bfa1] text-xs font-semibold text-white"
          >
            1
          </button>
          <button type="button">2</button>
          <button type="button">Prossimo</button>
        </div>
      </footer>
    </section>
  );
};

export default CompanyCertificatesView;
