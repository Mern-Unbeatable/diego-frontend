'use client';
import level from '../../../../src/assets/images/course/level1.png'
import level2 from '../../../../src/assets/images/course/level2.png'
import level3 from '../../../../src/assets/images/course/level3.png'
const HowWorks = () => {
    return (
        <div className="min-h-screen bg-white p-8 md:p-12">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-16">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Trova la soluzione su misura per te
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    La tua formazione, senza confini  Accedi ai nostri corsi di sicurezza sul lavoro, privacy e igiene alimentare. Corsi sempre aggiornati e progettati per le tue esigenze.  Ovunque e in qualsiasi momento: la nostra piattaforma eLearning ti offre una formazione smart, efficace e completamente conforme alle richieste delle autorità.  Investi nella tua crescita. Scegli la qualità, scegli il futuro.
                </p>
                <span className='text-[#73BFA1]'>"Esplora tutti i nostri corsi"
                </span>
            </div>

            {/* Level 1 */}
            <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1 order-2 md:order-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Utente singolo - Livello 1</h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                        Il Livello 1 è pensato per chi acquista un singolo corso sulla piattaforma.
                        Una volta effettuato il login con le credenziali ricevute, l’utente accede automaticamente al corso acquistato, senza bisogno di ulteriori passaggi.
                    </p>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Gestione team intuitiva e veloce
                    </div>
                </div>
                <div className="flex-1 order-1 md:order-2 relative">
                    <img src={level} alt="" />
                </div>
            </div>

            {/* Level 2 */}
            <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-12">
                <div className="flex-1 relative">
                    <img src={level2} alt="" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4"> Azienda - Livello 2  </h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Il Livello 2 è pensato per le aziende che acquistano pacchetti formativi multipli per i propri dipendenti, con gestione semplice e centralizzata.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Come funziona</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Invio credenziali: L’azienda riceve le credenziali admin per gestire il pacchetto e inviare ai dipendenti username e password univoci per ciascun corso</p>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Primo accesso dei dipendenti: Ogni dipendente completa una profilazione con dati personali necessari per validare il percorso e generare l’attestato finale.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Funzionalità admin: L’admin può assegnare corsi, monitorare l’avanzamento, consultare report dettagliati e scaricare gli attestati finali.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Archiviazione cloud: Attestati e report sono conservati in cloud in modo sicuro e organizzato, con ricerca, esportazione, notifiche e backup automatici.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">Il sistema garantisce ordine e accessibilità nel tempo.</p>
                </div>
            </div>

            {/* Level 3 */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-12">
                <div className="flex-1 order-2 md:order-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ente di formazione - Livello 3</h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                        Il Livello 3 è pensato per enti di formazione accreditati che acquistano una licenza della piattaforma, con accesso multi-tenant, per gestire corsi e corsisti in totale autonomia.
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                        Come funziona
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        Attivazione e accesso: L’ente riceve le credenziali per l’area riservata e un manuale tecnico.
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">Corsi: Assegnazione corsi, monitoraggio dell’avanzamento e dei progressi.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">Attestati personalizzati: Generazione automatica di certificazioni per i corsisti.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">Reportistica dettagliata: Registro presenze, tempo di fruizione, risultati dei test nel rispetto delle richieste delle autorità.</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">Con il Livello 3, gli enti di formazione hanno controllo completo sulle proprie attività formative, con autonomia e gestione professionale dei percorsi formativi.</p>
                </div>
                <div className="flex-1 order-1 md:order-2 relative">
                    <img src={level3} alt="" />
                </div>
            </div>
        </div>
    );
}
export default HowWorks;