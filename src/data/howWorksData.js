import level from '../assets/images/course/level1.png';
import level2 from '../assets/images/course/level2.png';
import level3 from '../assets/images/course/level3.png';

export const howWorksData = [
    {
        id: 1,
        title: 'Utente singolo - Livello 1',
        image: level,
        reverse: true,
        badge: 'Gestione team intuitiva e veloce',
        contents: [
            'Il Livello 1 è pensato per chi acquista un singolo corso sulla piattaforma. Una volta effettuato il login con le credenziali ricevute, l’utente accede automaticamente al corso acquistato, senza bisogno di ulteriori passaggi.',
        ],
    },
    {
        id: 2,
        title: 'Azienda - Livello 2',
        image: level2,
        reverse: false,
        contents: [
            'Il Livello 2 è pensato per le aziende che acquistano pacchetti formativi multipli per i propri dipendenti, con gestione semplice e centralizzata.',
            'Come funziona',
            'Invio credenziali: L’azienda riceve le credenziali admin per gestire il pacchetto e inviare ai dipendenti username e password univoci per ciascun corso',
            'Primo accesso dei dipendenti: Ogni dipendente completa una profilazione con dati personali necessari per validare il percorso e generare l’attestato finale.',
            'Funzionalità admin: L’admin può assegnare corsi, monitorare l’avanzamento, consultare report dettagliati e scaricare gli attestati finali.',
            'Archiviazione cloud: Attestati e report sono conservati in cloud in modo sicuro e organizzato, con ricerca, esportazione, notifiche e backup automatici.',
            'Il sistema garantisce ordine e accessibilità nel tempo.',
        ],
    },
    {
        id: 3,
        title: 'Ente di formazione - Livello 3',
        image: level3,
        reverse: true,
        contents: [
            'Il Livello 3 è pensato per enti di formazione accreditati che acquistano una licenza della piattaforma, con accesso multi-tenant, per gestire corsi e corsisti in totale autonomia.',
            'Come funziona',
            'Attivazione e accesso: L’ente riceve le credenziali per l’area riservata e un manuale tecnico.',
            'Corsi: Assegnazione corsi, monitoraggio dell’avanzamento e dei progressi.',
            'Attestati personalizzati: Generazione automatica di certificazioni per i corsisti.',
            'Reportistica dettagliata: Registro presenze, tempo di fruizione, risultati dei test nel rispetto delle richieste delle autorità.',
            'Con il Livello 3, gli enti di formazione hanno controllo completo sulle proprie attività formative, con autonomia e gestione professionale dei percorsi formativi.',
        ],
    },
];