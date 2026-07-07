import { CheckSquare, Square } from 'lucide-react';

const CompanyPrivacyPolicyView = () => {
    return (
        <section className="mx-auto max-w-[1120px] rounded-xl bg-white px-4 py-6 text-[#2f2f2f] sm:px-8 sm:py-10">
            <header className="mb-10 text-center">
                <p className="text-lg font-medium text-[#232323]">Privacy & policy</p>
                <h1 className="mt-6 text-xl font-semibold uppercase text-[#232323]">Informativa privacy</h1>
                <p className="mt-2 text-sm font-normal text-[#5f5f5f]">
                    AI SENSI DEGLI ARTT. 13 E 14 DEL REGOLAMENTO (UE) 2016/679
                </p>
            </header>

            <div className="space-y-9">
                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Titolare del trattamento</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">UNOSICUREZZA SRL Via di Dio Fratelli, 5</p>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">28887 Omegna (VB)</p>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">E-mail: info@unosicurezza.com</p>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Ambito dell'informativa</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">
                        Questa informativa riguarda gli utenti che partecipano ai corsi obbligatori di formazione in materia di
                        salute e sicurezza sul lavoro, erogati tramite piattaforma e-learning, ai sensi del D.lgs. 81/2008 e
                        degli Accordi Stato-Regioni.
                    </p>
                </section>

                <section>
                    <h2 className="mb-2 text-2xl font-semibold leading-[1.2] text-[#2b2b2b] underline underline-offset-4">
                        Tipologie di dati trattati
                    </h2>

                    <div className="space-y-6 pt-2">
                        <div>
                            <h3 className="mb-1 text-xl font-semibold leading-[1.2] text-[#2b2b2b]">Dati identificativi e anagrafici</h3>
                            <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                                <li>Nome e cognome</li>
                                <li>Data e luogo di nascita</li>
                                <li>Codice fiscale</li>
                                <li>Indirizzo di residenza</li>
                                <li>Citta e nazione di nascita</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-1 text-xl font-semibold leading-[1.2] text-[#2b2b2b]">Dati professionali</h3>
                            <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                                <li>Azienda di appartenenza</li>
                                <li>Sede legale</li>
                                <li>Codice fiscale e Partita IVA aziendale</li>
                                <li>Mansione ricoperta (necessaria per individuare il percorso formativo obbligatorio)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-1 text-xl font-semibold leading-[1.2] text-[#2b2b2b]">Dati relativi alla formazione</h3>
                            <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                                <li>Accessi alla piattaforma</li>
                                <li>Stato di avanzamento del corso</li>
                                <li>Tempi di fruizione</li>
                                <li>Risultati delle verifiche di apprendimento</li>
                                <li>Questionari di gradimento</li>
                                <li>Attestati rilasciati</li>
                                <li>Report formativi</li>
                            </ul>
                            <p className="mt-1 text-lg leading-[1.42] text-[#3b3b3b]">
                                Non vengono trattate categorie particolari di dati ai sensi dell'art. 9 GDPR.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="mb-2 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Finalita del trattamento e basi giuridiche</h2>

                    <div className="space-y-5 pt-2">
                        <div>
                            <h3 className="mb-1 text-xl font-semibold leading-[1.2] text-[#2b2b2b]">Finalita connesse alla formazione obbligatoria</h3>
                            <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                                <li>Erogazione dei corsi di formazione in materia di sicurezza sul lavoro</li>
                                <li>Verifica dell'apprendimento e tracciamento delle attivita formative</li>
                                <li>Rilascio e conservazione degli attestati</li>
                                <li>Adempimento degli obblighi normativi previsti dal D.lgs. 81/2008 e dagli Accordi Stato-Regioni</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-1 text-xl font-semibold leading-[1.2] text-[#2b2b2b]">Base giuridica:</h3>
                            <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                                <li>Adempimento di obblighi di legge (art. 6, par. 1, lett. c GDPR)</li>
                                <li>Esecuzione del contratto o di misure precontrattuali (art. 6, par. 1, lett. b GDPR)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-1 text-xl font-semibold leading-[1.2] text-[#2b2b2b]">Finalita amministrative</h3>
                            <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                                <li>Gestione contabile e fiscale</li>
                                <li>Gestione dei rapporti contrattuali con aziende e corsisti</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Natura obbligatoria del conferimento</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">
                        Il conferimento dei dati e obbligatorio per adempiere agli obblighi formativi previsti dalla normativa
                        sulla sicurezza. La mancata comunicazione dei dati impedisce la partecipazione ai corsi e il rilascio
                        degli attestati.
                    </p>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Destinatari dei dati</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">I dati possono essere comunicati a:</p>
                    <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                        <li>Datore di lavoro o azienda di appartenenza del corsista</li>
                        <li>Organi di vigilanza e autorita competenti (ASL, Ispettorato del Lavoro)</li>
                        <li>Fornitori di servizi informatici e hosting della piattaforma e-learning</li>
                        <li>Consulenti amministrativi, fiscali e legali</li>
                        <li>Formatori e soggetti incaricati della gestione dei corsi</li>
                    </ul>
                    <p className="mt-1 text-lg leading-[1.45] text-[#3b3b3b]">
                        Tutti i soggetti operano come Responsabili del trattamento o persone autorizzate.
                    </p>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Trasferimenti extra-UE</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">
                        I dati non vengono trasferiti al di fuori dell'Unione Europea. Eventuali trasferimenti futuri avverranno
                        solo nel rispetto degli artt. 44-49 GDPR.
                    </p>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Conservazione dei dati</h2>
                    <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                        <li>
                            I dati relativi alla formazione obbligatoria e agli attestati sono conservati per il tempo necessario a
                            dimostrare l'adempimento degli obblighi formativi, generalmente 10 anni, salvo termini diversi previsti
                            da norme specifiche.
                        </li>
                        <li>I dati amministrativi e contabili sono conservati secondo i termini fiscali vigenti.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Modifica dei dati</h2>
                    <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                        <li>
                            Eventuali modifiche ai dati personali possono essere richieste tramite comunicazione al Titolare, che
                            provvedera tramite personale autorizzato.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Diritti dell'interessato</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">
                        L'interessato puo esercitare i diritti previsti dagli artt. 15-22 GDPR:
                    </p>
                    <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                        <li>accesso</li>
                        <li>rettifica</li>
                        <li>cancellazione (nei limiti compatibili con gli obblighi di legge)</li>
                        <li>limitazione</li>
                        <li>opposizione</li>
                        <li>portabilita</li>
                    </ul>
                    <p className="mt-1 text-lg leading-[1.45] text-[#3b3b3b]">Le richieste vanno inviate a: info@unosicurezza.com</p>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">
                        L'interessato puo inoltre proporre reclamo al Garante per la Protezione dei Dati Personali.
                    </p>
                </section>

                <section>
                    <h2 className="mb-1 text-2xl font-semibold leading-[1.2] text-[#2b2b2b]">Misure di sicurezza</h2>
                    <p className="text-lg leading-[1.45] text-[#3b3b3b]">
                        Il Titolare adotta misure tecniche e organizzative adeguate a garantire la protezione dei dati, tra cui:
                    </p>
                    <ul className="list-disc pl-7 text-lg leading-[1.42] text-[#3b3b3b]">
                        <li>autenticazione sicura</li>
                        <li>backup periodici</li>
                        <li>procedure di gestione degli accessi</li>
                    </ul>
                </section>
            </div>

            <footer className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#cfeee1] px-5 py-2 text-lg font-medium text-[#2f5d4f]"
                    >
                        <CheckSquare size={19} /> Acconsento
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#ececf1] px-5 py-2 text-lg font-medium text-[#505a61]"
                    >
                        <Square size={19} /> Non acconsento
                    </button>
                </div>

                <button
                    type="button"
                    className="mt-6 rounded-full bg-[#73bfa1] px-8 py-2.5 text-lg font-medium text-white hover:bg-[#63a88c]"
                >
                    Invia
                </button>
            </footer>
        </section>
    );
};

export default CompanyPrivacyPolicyView;
