import { ArrowLeft, Check } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const h3Class =
  'pt-1 text-sm font-semibold text-[#2c2c2c] sm:text-base';
const bodyClass = 'text-sm leading-relaxed text-[#3b3b3b]';

const LicenseRenewTermsModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const content = (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Termini e condizioni"
    >
      <div
        className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#2f2f2f] hover:bg-gray-100"
            aria-label="Indietro"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              Privacy &amp; policy
            </p>
            <h2 className="text-sm font-semibold text-[#2b2b2b] sm:text-base">
              Contratto di rinnovo licenza
            </h2>
          </div>
          <div className="w-9" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <header className="mb-5 text-center sm:mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2b2b2b] sm:text-sm">
              Contratto di rinnovo licenza
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#2b2b2b] sm:text-sm">
              D&apos;uso piattaforma e-learning
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#2b2b2b] sm:text-sm">
              Utente livello 3 (licenziatario)
            </p>
          </header>

          <section className={`space-y-4 ${bodyClass}`}>
            <p className="text-center text-sm font-bold text-[#111]">Tra</p>
            <p>
              UnoSicurezza S.r.l., con sede legale in Via Fratelli Di Dio n. 5 -
              Omegna (VB), C.F./P.IVA ____________, in persona del legale
              rappresentante pro tempore (di seguito &quot;Fornitore&quot;).
            </p>
            <p className="text-center text-sm font-semibold text-[#2f2f2f]">e</p>
            <p>
              [Ragione Sociale Licenziatario], con sede in ____________,
              C.F./P.IVA ____________, in persona del legale rappresentante pro
              tempore (di seguito &quot;Licenziatario&quot;).
            </p>

            <h3 className={h3Class}>1. Richiamo del contratto originario</h3>
            <p>
              Le Parti richiamano il Contratto di Licenza d&apos;Uso della
              Piattaforma E-Learning - Utente Livello 3, sottoscritto in data
              (data pagamento del precedente contratto), che rimane pienamente
              valido ed efficace per quanto non espressamente modificato dal
              presente atto.
            </p>

            <h3 className={h3Class}>2. Definizione della modalita SaaS</h3>
            <p>
              La Piattaforma e fornita in modalita Saas (Software as a Service).
              Per Saas si intende una modalita di erogazione del software in cui
              il programma non viene venduto ne installato sui dispositivi del
              Licenziatario, ma e reso disponibile online come servizio.
            </p>

            <h3 className={h3Class}>3. Oggetto del rinnovo</h3>
            <p>
              Il Licenziatario richiede il rinnovo della Licenza d&apos;Uso per
              ulteriori 12 (dodici) mesi.
            </p>

            <h3 className={h3Class}>4. Scelta della tipologia di licenza</h3>
            <ul className="list-none space-y-1.5 text-sm">
              <li>
                [] 1S Licenza 100 - Fino a 100 corsisti - Corrispettivo: EUR
                365,00 IVA inclusa
              </li>
              <li>
                [] 1S Licenza 300 - Fino a 300 corsisti - Corrispettivo: EUR
                990,00 IVA inclusa
              </li>
              <li>
                [] 1S Licenza 600 - Fino a 600 corsisti - Corrispettivo: EUR
                1.830,00 IVA inclusa
              </li>
            </ul>

            <h3 className={h3Class}>5. Perfezionamento del rinnovo</h3>
            <p>
              Il rinnovo si intende efficace esclusivamente al verificarsi
              congiunto di: accettazione espressa del presente contratto;
              pagamento integrale del corrispettivo; conferma di attivazione da
              parte del Fornitore.
            </p>

            <h3 className={h3Class}>6. Decorrenza e durata</h3>
            <p>
              La Licenza rinnovata avra durata di 12 mesi dalla data di
              attivazione confermata dal Fornitore.
            </p>

            <h3 className={h3Class}>7. Continuita del servizio</h3>
            <p>
              I dati e i corsi gia assegnati rimangono attivi senza sospensione
              tecnica.
            </p>

            <h3 className={h3Class}>
              8. Regola di completamento dei corsisti (60 giorni)
            </h3>
            <p>
              I corsisti che hanno effettuato il primo accesso a un corso prima
              della scadenza mantengono 60 giorni.
            </p>

            <h3 className={h3Class}>9. Conferma delle restanti condizioni</h3>
            <p>
              Restano applicabili le disposizioni del Contratto Originario,
              inclusi SLA, GDPR e Foro di Verbania.
            </p>

            <h3 className={h3Class}>10. Natura del rapporto</h3>
            <p>
              Il presente rinnovo e stipulato esclusivamente tra soggetti
              professionali (B2B).
            </p>

            <h3 className={h3Class}>11. Legge applicabile e foro competente</h3>
            <p>
              Il presente atto e regolato dalla legge italiana. Foro esclusivo:
              Verbania.
            </p>
          </section>

          <section className="mt-6 rounded-xl bg-[#edf6f3] p-4 sm:mt-8 sm:p-5">
            <label className="flex items-start gap-3 text-xs text-[#4a4a4a] sm:text-sm">
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#73bfa1] text-white">
                <Check size={11} />
              </span>
              <span>
                Dichiaro di comprendere adeguatamente la lingua italiana, orale
                e scritta, e prendo atto che UnoSicurezza non potra essere
                ritenuta responsabile per eventuali difficolta di comprensione,
                fruizione o apprendimento dovute a una mia insufficiente
                conoscenza della lingua.
              </span>
            </label>

            <button
              type="button"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73bfa1] px-6 text-sm font-medium text-white sm:w-auto"
              onClick={onClose}
            >
              Invia
            </button>
          </section>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default LicenseRenewTermsModal;
