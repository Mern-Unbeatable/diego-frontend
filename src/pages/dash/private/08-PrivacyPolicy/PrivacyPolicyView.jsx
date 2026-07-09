import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaCheckSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 'titolare', label: 'Titolare del trattamento' },
  { id: 'ambito', label: "Ambito dell'informativa" },
  { id: 'tipologie', label: 'Tipologie di dati trattati' },
  { id: 'finalita', label: 'Finalità e basi giuridiche' },
  { id: 'natura', label: 'Natura del conferimento' },
  { id: 'destinatari', label: 'Destinatari dei dati' },
  { id: 'extra-ue', label: 'Trasferimenti extra-UE' },
  { id: 'conservazione', label: 'Conservazione dei dati' },
  { id: 'modifica', label: 'Modifica dei dati' },
  { id: 'diritti', label: "Diritti dell'interessato" },
  { id: 'sicurezza', label: 'Misure di sicurezza' },
];

export default function PrivacyPolicyView() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('titolare');
  const observer = useRef(null);
  const scrollLockRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      // If we are currently scrolling from a manual click, ignore observer triggers
      if (scrollLockRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const mainElement = document.querySelector('main');

    observer.current = new IntersectionObserver(handleObserver, {
      root: mainElement || null,
      rootMargin: '0px 0px -80% 0px',
    });

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.current.observe(el);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    // Enable lock
    scrollLockRef.current = true;
    setActiveSection(id);

    // Clear previous timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Release lock after smooth scroll completes (~800ms)
    timeoutRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, 800);
  };

  return (
    <div className="mx-auto w-full ">
      {/* Top Header Row */}
      <div className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 border border-gray-100 transition-all text-[#2f2f2f]"
          aria-label="Indietro"
        >
          <FaArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Privacy & Policy</h1>
          <p className="text-base text-gray-400 font-semibold mt-0.5">
            AI SENSI DEGLI ARTT. 13 E 14 DEL REGOLAMENTO (UE) 2016/679
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
        {/* Sticky Left Sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-gray-400">
              Indice sezioni
            </h3>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left text-base font-semibold py-2 px-3 rounded-lg border-l-2 transition-all duration-200 ${
                    activeSection === sec.id
                      ? 'border-[#73bfa1] bg-[#f2faf6] text-[#53997f]'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm space-y-8">
            {/* 1. Titolare */}
            <section id="titolare" className="scroll-mt-6 border-b border-gray-100 pb-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Titolare del trattamento</h3>
              <div className="space-y-1 text-base text-gray-600 font-medium">
                <p>UNOSICUREZZA SRL Via di Dio Fratelli, 5</p>
                <p>28887 Omegna (VB)</p>
                <p className="text-[#73bfa1] hover:underline cursor-pointer">E-mail: info@unosicurezza.com</p>
              </div>
            </section>

            {/* 2. Ambito */}
            <section id="ambito" className="scroll-mt-6 border-b border-gray-100 pb-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Ambito dell'informativa</h3>
              <p className="text-base leading-relaxed text-gray-600 font-medium">
                Questa informativa riguarda gli utenti che partecipano ai corsi obbligatori
                di formazione in materia di salute e sicurezza sul lavoro, erogati tramite
                piattaforma e-learning, ai sensi del D.Lgs. 81/2008 e degli Accordi Stato-Regioni.
              </p>
            </section>

            {/* 3. Tipologie */}
            <section id="tipologie" className="scroll-mt-6 border-b border-gray-100 pb-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Tipologie di dati trattati</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-1">
                    Dati identificativi e anagrafici
                  </h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                    <li>Nome e cognome</li>
                    <li>Data e luogo di nascita</li>
                    <li>Codice fiscale</li>
                    <li>Indirizzo di residenza</li>
                    <li>Città e nazione di nascita</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-1">
                    Dati professionali
                  </h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                    <li>Azienda di appartenenza</li>
                    <li>Sede legale</li>
                    <li>Codice fiscale e Partita IVA aziendale</li>
                    <li>Mansione ricoperta (necessaria per individuare il percorso formativo obbligatorio)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-1">
                    Dati relativi alla formazione
                  </h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                    <li>Accessi alla piattaforma</li>
                    <li>Stato di avanzamento del corso</li>
                    <li>Tempi di fruizione</li>
                    <li>Risultati delle verifiche di apprendimento</li>
                    <li>Questionari di gradimento</li>
                    <li>Attestati rilasciati</li>
                    <li>Report formativi</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-semibold italic bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                Non vengono trattate categorie particolari di dati ai sensi dell'art. 9 GDPR.
              </p>
            </section>

            {/* 4. Finalita */}
            <section id="finalita" className="scroll-mt-6 border-b border-gray-100 pb-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Finalità del trattamento e basi giuridiche</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-1">
                    Finalità connesse alla formazione obbligatoria
                  </h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                    <li>Erogazione dei corsi di formazione in materia di sicurezza sul lavoro</li>
                    <li>Verifica dell'apprendimento e tracciamento delle attività formative</li>
                    <li>Rilascio e conservazione degli attestati</li>
                    <li>Adempimento degli obblighi normativi previsti dal D.Lgs. 81/2008</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-1">
                    Base giuridica:
                  </h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                    <li>Adempimento di obblighi di legge (art. 6, par. 1, lett. c GDPR)</li>
                    <li>Esecuzione del contratto o di misure precontrattuali (art. 6, par. 1, lett. b GDPR)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-1">
                    Finalità amministrative
                  </h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                    <li>Gestione contabile e fiscale</li>
                    <li>Gestione dei rapporti contrattuali con aziende e corsisti</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Natura */}
            <section id="natura" className="scroll-mt-6 border-b border-gray-100 pb-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Natura obbligatoria del conferimento</h3>
              <p className="text-base leading-relaxed text-gray-600 font-medium">
                Il conferimento dei dati è obbligatorio per adempiere agli obblighi formativi
                previsti dalla normativa sulla sicurezza. La mancata comunicazione dei dati
                impedisce la partecipazione ai corsi e il rilascio degli attestati.
              </p>
            </section>

            {/* 6. Destinatari */}
            <section id="destinatari" className="scroll-mt-6 border-b border-gray-100 pb-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Destinatari dei dati</h3>
              <p className="text-base text-gray-600 font-medium">I dati possono essere comunicati a:</p>
              <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                <li>Datori di lavoro o aziende di appartenenza del corsista</li>
                <li>Organi di vigilanza e autorità competenti (ASL, Ispettorato del Lavoro)</li>
                <li>Fornitori di servizi informatici e hosting della piattaforma e-learning</li>
                <li>Consulenti amministrativi, fiscali e legali</li>
                <li>Formatori e soggetti incaricati della gestione dei corsi</li>
              </ul>
              <p className="text-xs text-gray-400 font-semibold italic bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                Tutti i soggetti operano come Responsabili del trattamento o persone autorizzate.
              </p>
            </section>

            {/* 7. Extra-UE */}
            <section id="extra-ue" className="scroll-mt-6 border-b border-gray-100 pb-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Trasferimenti extra-UE</h3>
              <p className="text-base leading-relaxed text-gray-600 font-medium">
                I dati non vengono trasferiti al di fuori dell'Unione Europea.
                Eventuali trasferimenti futuri avverranno solo nel rispetto degli artt. 44-49 GDPR.
              </p>
            </section>

            {/* 8. Conservazione */}
            <section id="conservazione" className="scroll-mt-6 border-b border-gray-100 pb-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Conservazione dei dati</h3>
              <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-1.5">
                <li>
                  I dati relativi alla formazione obbligatoria e agli attestati sono conservati
                  per il tempo necessario a dimostrare l'adempimento degli obblighi formativi,
                  generalmente 10 anni.
                </li>
                <li>
                  I dati amministrativi e contabili sono conservati secondo i termini fiscali vigenti.
                </li>
              </ul>
            </section>

            {/* 9. Modifica */}
            <section id="modifica" className="scroll-mt-6 border-b border-gray-100 pb-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Modifica dei dati</h3>
              <p className="text-base leading-relaxed text-gray-600 font-medium">
                Eventuali modifiche ai dati personali possono essere richieste tramite comunicazione
                al Titolare, che provvederà tramite personale autorizzato.
              </p>
            </section>

            {/* 10. Diritti */}
            <section id="diritti" className="scroll-mt-6 border-b border-gray-100 pb-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Diritti dell'interessato</h3>
              <p className="text-base text-gray-600 font-medium">
                L'interessato può esercitare i diritti previsti dagli artt. 15-22 GDPR:
              </p>
              <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                <li>accesso</li>
                <li>rettifica</li>
                <li>cancellazione (nei limiti compatibili con gli obblighi di legge)</li>
                <li>limitazione</li>
                <li>opposizione</li>
                <li>portabilità</li>
              </ul>
              <div className="space-y-1.5 text-base text-gray-600 font-medium">
                <p>Le richieste vanno inviate a: <span className="text-[#73bfa1] hover:underline cursor-pointer">info@unosicurezza.com</span></p>
                <p>L'interessato può inoltre proporre reclamo al Garante per la Protezione dei Dati Personali.</p>
              </div>
            </section>

            {/* 11. Sicurezza */}
            <section id="sicurezza" className="scroll-mt-6 pb-2">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Misure di sicurezza</h3>
              <p className="text-base leading-relaxed text-gray-600 font-medium mb-3">
                Il Titolare adotta misure tecniche e organizzative adeguate a garantire la protezione dei dati, tra cui:
              </p>
              <ul className="list-disc pl-5 text-base text-gray-600 font-medium space-y-0.5">
                <li>autenticazione sicura</li>
                <li>backup periodici</li>
                <li>procedure di gestione degli accessi</li>
              </ul>
            </section>
          </div>

          {/* Under Cards Consent Disclaimer */}
          <div className="rounded-xl border border-gray-100 bg-[#f6fbf9] p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <FaCheckSquare className="mt-1 flex-shrink-0 text-[#73bfa1]" size={16} />
              <p className="text-xs leading-relaxed text-gray-600 font-medium md:text-sm">
                Dichiaro di comprendere adeguatamente la lingua italiana, orale e scritta,
                quale lingua veicolare del corso, e prendo atto che UnoSicurezza non potrà
                essere ritenuta responsabile per eventuali difficoltà di comprensione,
                fruizione o apprendimento dovute a una mia insufficiente conoscenza della lingua.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="rounded-full bg-[#73BFA1] px-10 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5fa488]"
              onClick={() => navigate(-1)}
            >
              Invia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
