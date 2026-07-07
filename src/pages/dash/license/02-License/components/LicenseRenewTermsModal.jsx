import { ArrowLeft, Check } from 'lucide-react';

const LicenseRenewTermsModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/40 p-3 sm:p-6">
      <div className="mx-auto max-w-[1120px] rounded-xl bg-white p-5 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center text-[#2f2f2f]"
        >
          <ArrowLeft size={18} />
        </button>

        <header className="mt-2 text-center">
          <h2 className="text-sl font-semibold text-[#222222]">
            Privacy & policy
          </h2>
          <p className="mt-6 text-xl font-semibold text-[#2b2b2b] uppercase">
            CONTRATTO DI RINNOVO LICENZA
          </p>
          <p className="mt-2 text-xl font-semibold text-[#2b2b2b] uppercase">
            D'USO PIATTAFORMA E-LEARNING
          </p>
          <p className="mt-2 text-xl font-semibold text-[#2b2b2b] uppercase">
            UTENTE LIVELLO 3 (LICENZIATARIO)
          </p>
        </header>

        <section className="mt-8 space-y-5 text-base leading-[1.45] text-[#3b3b3b]">
          <p className="text-center text-lg font-bold text-[#111]">Tra</p>
          <p>
            UnoSicurezza S.r.l., con sede legale in Via Fratelli Di Dio n. 5 -
            Omegna (VB), C.F./P.IVA ____________, in persona del legale
            rappresentante pro tempore (di seguito "Fornitore").
          </p>
          <p className="text-center text-lg font-semibold text-[#2f2f2f]">e</p>
          <p>
            [Ragione Sociale Licenziatario], con sede in ____________,
            C.F./P.IVA ____________, in persona del legale rappresentante pro
            tempore (di seguito "Licenziatario").
          </p>

          <h3 className="pt-2 text-xl font-semibold text-[#2c2c2c]">
            1. RICHIAMO DEL CONTRATTO ORIGINARIO
          </h3>
          <p>
            Le Parti richiamano il Contratto di Licenza d'Uso della Piattaforma
            E-Learning - Utente Livello 3, sottoscritto in data (data pagamento
            del precedente contratto), che rimane pienamente valido ed efficace
            per quanto non espressamente modificato dal presente atto.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            2. DEFINIZIONE DELLA MODALITA SaaS
          </h3>
          <p>
            La Piattaforma e fornita in modalita Saas (Software as a Service).
            Per Saas si intende una modalita di erogazione del software in cui
            il programma non viene venduto ne installato sui dispositivi del
            Licenziatario, ma e reso disponibile online come servizio.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            3. OGGETTO DEL RINNOVO
          </h3>
          <p>
            Il Licenziatario richiede il rinnovo della Licenza d'Uso per
            ulteriori 12 (dodici) mesi.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            4. SCELTA DELLA TIPOLOGIA DI LICENZA
          </h3>
          <ul className="list-none space-y-1">
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

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            5. PERFEZIONAMENTO DEL RINNOVO
          </h3>
          <p>
            Il rinnovo si intende efficace esclusivamente al verificarsi
            congiunto di: accettazione espressa del presente contratto;
            pagamento integrale del corrispettivo; conferma di attivazione da
            parte del Fornitore.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            6. DECORRENZA E DURATA
          </h3>
          <p>
            La Licenza rinnovata avra durata di 12 mesi dalla data di
            attivazione confermata dal Fornitore.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            7. CONTINUITA DEL SERVIZIO
          </h3>
          <p>
            I dati e i corsi gia assegnati rimangono attivi senza sospensione
            tecnica.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            8. REGOLA DI COMPLETAMENTO DEI CORSISTI (60 GIORNI)
          </h3>
          <p>
            I corsisti che hanno effettuato il primo accesso a un corso prima
            della scadenza mantengono 60 giorni.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            9. CONFERMA DELLE RESTANTI CONDIZIONI
          </h3>
          <p>
            Restano applicabili le disposizioni del Contratto Originario,
            inclusi SLA, GDPR e Foro di Verbania.
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            10. NATURA DEL RAPPORTO
          </h3>
          <p>
            Il presente rinnovo e stipulato esclusivamente tra soggetti
            professionali (B2B).
          </p>

          <h3 className="text-xl font-semibold text-[#2c2c2c]">
            11. LEGGE APPLICABILE E FORO COMPETENTE
          </h3>
          <p>
            Il presente atto e regolato dalla legge italiana. Foro esclusivo:
            Verbania.
          </p>
        </section>

        <section className="mt-8 rounded-xl bg-[#edf6f3] p-5">
          <label className="flex items-start gap-3 text-[15px] text-[#4a4a4a]">
            <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-[2px] bg-[#73bfa1] text-white">
              <Check size={11} />
            </span>
            <span>
              Dichiaro di comprendere adeguatamente la lingua italiana, orale e
              scritta, e prendo atto che UnoSicurezza non potra essere ritenuta
              responsabile per eventuali difficolta di comprensione, fruizione o
              apprendimento dovute a una mia insufficiente conoscenza della
              lingua.
            </span>
          </label>

          <button
            type="button"
            className="mt-5 rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
            onClick={onClose}
          >
            Invia
          </button>
        </section>
      </div>
    </div>
  );
};

export default LicenseRenewTermsModal;
