import { FaCheckSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const h2Class =
  'mb-2 text-base font-semibold leading-snug text-[#2b2b2b] sm:text-lg md:text-xl';
const h3Class =
  'mb-1.5 text-sm font-semibold leading-snug text-[#2b2b2b] sm:text-base';
const bodyClass =
  'text-sm leading-relaxed text-[#3b3b3b] sm:text-[15px] md:text-base';
const listClass = `list-disc space-y-1 pl-5 ${bodyClass} sm:pl-6`;

export default function PrivacyPolicyView() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto min-w-0 max-w-5xl overflow-hidden rounded-xl bg-white px-3 py-5 text-[#2f2f2f] sm:px-6 sm:py-8 md:px-8 md:py-10">
      <header className="mb-6 text-center sm:mb-8 md:mb-10">
        <h1 className="text-base font-semibold uppercase tracking-wide text-[#232323] sm:text-lg md:text-xl">
          Informativa privacy
        </h1>
        <p className="mt-2 text-xs font-medium leading-relaxed text-[#5f5f5f] sm:text-sm">
          AI SENSI DEGLI ARTT. 13 E 14 DEL REGOLAMENTO (UE) 2016/679
        </p>
      </header>

      <div className="space-y-6 sm:space-y-8 md:space-y-9">
        <section>
          <h2 className={h2Class}>Titolare del trattamento</h2>
          <div className={`space-y-0.5 ${bodyClass}`}>
            <p>UNOSICUREZZA SRL Via di Dio Fratelli, 5</p>
            <p>28887 Omegna (VB)</p>
            <p className="break-all sm:break-normal">
              E-mail: info@unosicurezza.com
            </p>
          </div>
        </section>

        <section>
          <h2 className={h2Class}>Ambito dell&apos;informativa</h2>
          <p className={bodyClass}>
            Questa informativa riguarda gli utenti che partecipano ai corsi
            obbligatori di formazione in materia di salute e sicurezza sul
            lavoro, erogati tramite piattaforma e-learning, ai sensi del D.Lgs.
            81/2008 e degli Accordi Stato-Regioni.
          </p>
        </section>

        <section>
          <h2 className={`${h2Class} underline decoration-1 underline-offset-4`}>
            Tipologie di dati trattati
          </h2>

          <div className="space-y-5 pt-1 sm:space-y-6 sm:pt-2">
            <div>
              <h3 className={h3Class}>Dati identificativi e anagrafici</h3>
              <ul className={listClass}>
                <li>Nome e cognome</li>
                <li>Data e luogo di nascita</li>
                <li>Codice fiscale</li>
                <li>Indirizzo di residenza</li>
                <li>Città e nazione di nascita</li>
              </ul>
            </div>

            <div>
              <h3 className={h3Class}>Dati professionali</h3>
              <ul className={listClass}>
                <li>Azienda di appartenenza</li>
                <li>Sede legale</li>
                <li>Codice fiscale e Partita IVA aziendale</li>
                <li>
                  Mansione ricoperta (necessaria per individuare il percorso
                  formativo obbligatorio)
                </li>
              </ul>
            </div>

            <div>
              <h3 className={h3Class}>Dati relativi alla formazione</h3>
              <ul className={listClass}>
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

          <p className="mt-3 text-xs italic text-gray-500 sm:text-sm">
            Non vengono trattate categorie particolari di dati ai sensi
            dell&apos;art. 9 GDPR.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>
            Finalità del trattamento e basi giuridiche
          </h2>

          <div className="space-y-5 pt-1 sm:space-y-6 sm:pt-2">
            <div>
              <h3 className={h3Class}>
                Finalità connesse alla formazione obbligatoria
              </h3>
              <ul className={listClass}>
                <li>
                  Erogazione dei corsi di formazione in materia di sicurezza sul
                  lavoro
                </li>
                <li>
                  Verifica dell&apos;apprendimento e tracciamento delle attività
                  formative
                </li>
                <li>Rilascio e conservazione degli attestati</li>
                <li>
                  Adempimento degli obblighi normativi previsti dal D.Lgs.
                  81/2008
                </li>
              </ul>
            </div>

            <div>
              <h3 className={h3Class}>Base giuridica:</h3>
              <ul className={listClass}>
                <li>
                  Adempimento di obblighi di legge (art. 6, par. 1, lett. c
                  GDPR)
                </li>
                <li>
                  Esecuzione del contratto o di misure precontrattuali (art. 6,
                  par. 1, lett. b GDPR)
                </li>
              </ul>
            </div>

            <div>
              <h3 className={h3Class}>Finalità amministrative</h3>
              <ul className={listClass}>
                <li>Gestione contabile e fiscale</li>
                <li>
                  Gestione dei rapporti contrattuali con aziende e corsisti
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className={h2Class}>Natura obbligatoria del conferimento</h2>
          <p className={bodyClass}>
            Il conferimento dei dati è obbligatorio per adempiere agli obblighi
            formativi previsti dalla normativa sulla sicurezza. La mancata
            comunicazione dei dati impedisce la partecipazione ai corsi e il
            rilascio degli attestati.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Destinatari dei dati</h2>
          <p className={`mb-2 ${bodyClass}`}>I dati possono essere comunicati a:</p>
          <ul className={listClass}>
            <li>Datori di lavoro o aziende di appartenenza del corsista</li>
            <li>
              Organi di vigilanza e autorità competenti (ASL, Ispettorato del
              Lavoro)
            </li>
            <li>
              Fornitori di servizi informatici e hosting della piattaforma
              e-learning
            </li>
            <li>Consulenti amministrativi, fiscali e legali</li>
            <li>Formatori e soggetti incaricati della gestione dei corsi</li>
          </ul>
          <p className="mt-2 text-xs italic text-gray-500 sm:text-sm">
            Tutti i soggetti operano come Responsabili del trattamento o
            persone autorizzate.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Trasferimenti extra-UE</h2>
          <p className={bodyClass}>
            I dati non vengono trasferiti al di fuori dell&apos;Unione Europea.
            Eventuali trasferimenti futuri avverranno solo nel rispetto degli
            artt. 44-49 GDPR.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Conservazione dei dati</h2>
          <ul className={listClass}>
            <li>
              I dati relativi alla formazione obbligatoria e agli attestati sono
              conservati per il tempo necessario a dimostrare l&apos;adempimento
              degli obblighi formativi, generalmente 10 anni.
            </li>
            <li>
              I dati amministrativi e contabili sono conservati secondo i termini
              fiscali vigenti.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={h2Class}>Modifica dei dati</h2>
          <p className={bodyClass}>
            Eventuali modifiche ai dati personali possono essere richieste
            tramite comunicazione al Titolare, che provvederà tramite personale
            autorizzato.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Diritti dell&apos;interessato</h2>
          <p className={`mb-2 ${bodyClass}`}>
            L&apos;interessato può esercitare i diritti previsti dagli artt.
            15-22 GDPR:
          </p>
          <ul className={listClass}>
            <li>accesso</li>
            <li>rettifica</li>
            <li>
              cancellazione (nei limiti compatibili con gli obblighi di legge)
            </li>
            <li>limitazione</li>
            <li>opposizione</li>
            <li>portabilità</li>
          </ul>
          <div className={`mt-3 space-y-1 ${bodyClass}`}>
            <p>
              Le richieste vanno inviate a:{' '}
              <a
                href="mailto:info@unosicurezza.com"
                className="break-all text-[#73bfa1] hover:underline sm:break-normal"
              >
                info@unosicurezza.com
              </a>
            </p>
            <p>
              L&apos;interessato può inoltre proporre reclamo al Garante per la
              Protezione dei Dati Personali.
            </p>
          </div>
        </section>

        <section>
          <h2 className={h2Class}>Misure di sicurezza</h2>
          <p className={`mb-2 ${bodyClass}`}>
            Il Titolare adotta misure tecniche e organizzative adeguate a
            garantire la protezione dei dati, tra cui:
          </p>
          <ul className={listClass}>
            <li>autenticazione sicura</li>
            <li>backup periodici</li>
            <li>procedure di gestione degli accessi</li>
          </ul>
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-gray-100 bg-[#f6fbf9] p-4 shadow-sm sm:mt-8 sm:p-5">
        <div className="flex items-start gap-3">
          <FaCheckSquare
            className="mt-0.5 shrink-0 text-[#73bfa1]"
            size={16}
          />
          <p className="text-sm leading-relaxed font-medium text-gray-600 sm:text-[15px]">
            Dichiaro di comprendere adeguatamente la lingua italiana, orale e
            scritta, quale lingua veicolare del corso, e prendo atto che
            UnoSicurezza non potrà essere ritenuta responsabile per eventuali
            difficoltà di comprensione, fruizione o apprendimento dovute a una
            mia insufficiente conoscenza della lingua.
          </p>
        </div>
      </div>

      <div className="flex justify-stretch pt-4 sm:justify-end sm:pt-5">
        <button
          type="button"
          className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73BFA1] px-8 text-sm font-semibold text-white transition hover:bg-[#5fa488] sm:w-auto sm:px-10"
          onClick={() => navigate(-1)}
        >
          Invia
        </button>
      </div>
    </section>
  );
}
