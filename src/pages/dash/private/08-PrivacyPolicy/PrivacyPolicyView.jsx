import React from 'react';
import { FaArrowLeft, FaCheckSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const sectionTitleClass = 'mb-2 text-xl font-semibold text-[#222] md:text-xl';
const paragraphClass = 'text-[13px] leading-relaxed text-[#343434] md:text-sm';
const listClass = 'list-disc space-y-1 pl-5 text-[13px] text-[#343434] md:text-sm';

export default function PrivacyPolicyView() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto w-full max-w-[1000px] rounded-2xl bg-[#f5f5f5] p-6 md:p-12">
            <div className="mb-10  items-center">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-[#2f2f2f]"
                    aria-label="Indietro"
                >
                    <FaArrowLeft size={18} />
                </button>

                <div className="text-center">
                    <h1 className="text-lg font-semibold text-[#333] md:text-xl">
                        Privacy & policy
                    </h1>
                    <h2 className="mt-4 text-2xl font-semibold text-[#333] md:text-xl">
                        INFORMATIVA PRIVACY
                    </h2>
                    <p className="mt-2 text-sm uppercase text-[#515151] md:text-[16px]">
                        AI SENSI DEGLI ARTT. 13 E 14 DEL REGOLAMENTO (UE) 2016/679
                    </p>
                </div>

                <span />
            </div>

            <div className="space-y-8 md:space-y-10">
                <section>
                    <h3 className={sectionTitleClass}>Titolare del trattamento</h3>
                    <p className={paragraphClass}>UNOSICUREZZA SRL Via di Dio Fratelli, 5</p>
                    <p className={paragraphClass}>28887 Omegna (VB)</p>
                    <p className={paragraphClass}>E-mail: info@unosicurezza.com</p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Ambito dell'informativa</h3>
                    <p className={paragraphClass}>
                        Questa informativa riguarda gli utenti che partecipano ai corsi obbligatori
                        di formazione in materia di salute e sicurezza sul lavoro, erogati tramite
                        piattaforma e-learning, ai sensi del D.Lgs. 81/2008 e degli Accordi Stato-Regioni.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Tipologie di dati trattati</h3>

                    <h4 className="mb-2 text-xl font-semibold text-[#262626] md:text-xl">
                        Dati identificativi e anagrafici
                    </h4>
                    <ul className={listClass}>
                        <li>Nome e cognome</li>
                        <li>Data e luogo di nascita</li>
                        <li>Codice fiscale</li>
                        <li>Indirizzo di residenza</li>
                        <li>Citta e nazione di nascita</li>
                    </ul>

                    <h4 className="mb-2 mt-5 text-xl font-semibold text-[#262626] md:text-xl">
                        Dati professionali
                    </h4>
                    <ul className={listClass}>
                        <li>Azienda di appartenenza</li>
                        <li>Sede legale</li>
                        <li>Codice fiscale e Partita IVA aziendale</li>
                        <li>Mansione ricoperta (necessaria per individuare il percorso formativo obbligatorio)</li>
                    </ul>

                    <h4 className="mb-2 mt-5 text-xl font-semibold text-[#262626] md:text-xl">
                        Dati relativi alla formazione
                    </h4>
                    <ul className={listClass}>
                        <li>Accessi alla piattaforma</li>
                        <li>Stato di avanzamento del corso</li>
                        <li>Tempi di fruizione</li>
                        <li>Risultati delle verifiche di apprendimento</li>
                        <li>Questionari di gradimento</li>
                        <li>Attestati rilasciati</li>
                        <li>Report formativi</li>
                    </ul>
                    <p className={`${paragraphClass} mt-2`}>
                        Non vengono trattate categorie particolari di dati ai sensi dell'art. 9 GDPR.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Finalita del trattamento e basi giuridiche</h3>
                    <h4 className="mb-2 text-xl font-semibold text-[#262626] ">
                        Finalita connesse alla formazione obbligatoria
                    </h4>
                    <ul className={listClass}>
                        <li>Erogazione dei corsi di formazione in materia di sicurezza sul lavoro</li>
                        <li>Verifica dell'apprendimento e tracciamento delle attivita formative</li>
                        <li>Rilascio e conservazione degli attestati</li>
                        <li>Adempimento degli obblighi normativi previsti dal D.Lgs. 81/2008</li>
                    </ul>

                    <h4 className="mb-2 mt-5 text-xl font-semibold text-[#262626] md:text-xl">
                        Base giuridica:
                    </h4>
                    <ul className={listClass}>
                        <li>Adempimento di obblighi di legge (art. 6, par. 1, lett. c GDPR)</li>
                        <li>Esecuzione del contratto o di misure precontrattuali (art. 6, par. 1, lett. b GDPR)</li>
                    </ul>

                    <h4 className="mb-2 mt-5 text-xl font-semibold text-[#262626] md:text-xl">
                        Finalita amministrative
                    </h4>
                    <ul className={listClass}>
                        <li>Gestione contabile e fiscale</li>
                        <li>Gestione dei rapporti contrattuali con aziende e corsisti</li>
                    </ul>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Natura obbligatoria del conferimento</h3>
                    <p className={paragraphClass}>
                        Il conferimento dei dati e obbligatorio per adempiere agli obblighi formativi
                        previsti dalla normativa sulla sicurezza. La mancata comunicazione dei dati
                        impedisce la partecipazione ai corsi e il rilascio degli attestati.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Destinatari del dati</h3>
                    <p className={paragraphClass}>I dati possono essere comunicati a:</p>
                    <ul className={listClass}>
                        <li>Datori di lavoro o aziende di appartenenza del corsista</li>
                        <li>Organi di vigilanza e autorita competenti (ASL, Ispettorato del Lavoro)</li>
                        <li>Fornitori di servizi informatici e hosting della piattaforma e-learning</li>
                        <li>Consulenti amministrativi, fiscali e legali</li>
                        <li>Formatori e soggetti incaricati della gestione dei corsi</li>
                    </ul>
                    <p className={`${paragraphClass} mt-2`}>
                        Tutti i soggetti operano come Responsabili del trattamento o persone autorizzate.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Trasferimenti extra-UE</h3>
                    <p className={paragraphClass}>
                        I dati non vengono trasferiti al di fuori dell'Unione Europea.
                        Eventuali trasferimenti futuri avverranno solo nel rispetto degli artt. 44-49 GDPR.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Conservazione dei dati</h3>
                    <ul className={listClass}>
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

                <section>
                    <h3 className={sectionTitleClass}>Modifica de dati</h3>
                    <p className={paragraphClass}>
                        Eventuali modifiche ai dati personali possono essere richieste tramite comunicazione
                        al Titolare, che provvedera tramite personale autorizzato.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Diritto dell'interessato</h3>
                    <p className={paragraphClass}>
                        L'interessato puo esercitare i diritti previsti dagli artt. 15-22 GDPR:
                    </p>
                    <ul className={listClass}>
                        <li>accesso</li>
                        <li>rettifica</li>
                        <li>cancellazione (nei limiti compatibili con gli obblighi di legge)</li>
                        <li>limitazione</li>
                        <li>opposizione</li>
                        <li>portabilita</li>
                    </ul>
                    <p className={`${paragraphClass} mt-2`}>
                        Le richieste vanno inviate a: info@unosicurezza.com
                    </p>
                    <p className={paragraphClass}>
                        L'interessato puo inoltre proporre reclamo al Garante per la Protezione dei Dati Personali.
                    </p>
                </section>

                <section>
                    <h3 className={sectionTitleClass}>Misure di sicurezza</h3>
                    <p className={paragraphClass}>
                        Il Titolare adotta misure tecniche e organizzative adeguate a garantire la protezione dei dati, tra cui:
                    </p>
                    <ul className={listClass}>
                        <li>autenticazione sicura</li>
                        <li>backup periodici</li>
                        <li>procedure di gestione degli accessi</li>
                    </ul>
                </section>

                <div className="rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <FaCheckSquare className="mt-0.5 text-[#73bfa1]" />
                        <p className="text-sm leading-relaxed text-[#3d3d3d] ">
                            Dichiaro di comprendere adeguatamente la lingua italiana, orale e scritta,
                            quale lingua veicolare del corso, e prendo atto che UnoSicurezza non potra
                            essere ritenuta responsabile per eventuali difficolta di comprensione,
                            fruizione o apprendimento dovute a una mia insufficiente conoscenza della lingua.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-full bg-[#73BFA1] px-6 py-2 text-sm font-semibold text-white"
                    onClick={() => navigate(-1)}
                >
                    Invia
                </button>
            </div>
        </div>
    );
}
