import { Heading, Paragraph } from '../../../../../../../components/ui';
import { H2, H4 } from '../../../../../../../components/ui/Heading';
import P from '../../../../../../../components/ui/P';
import ServiceList from './../../../../../../../components/common/ServiceList';

const DetailsLeftSide = () => {
  const serviceItems = [
    'Consulenza iniziale e analisi della situazione attuale',
    'Redazione della documentazione necessaria',
    'Formazione del personale coinvolto',
    'Supporto continuativo e aggiornamenti',
  ];

  return (
    <div>
      <Heading level={2}>Dettagli del servizio</Heading>
      <Paragraph className={'mt-4 max-w-[586px]'}>
        Corsi finalizzati a garantire alle aziende e gestori soggetti al D. lgs.
        105/2015 l’affinare delle proprie capacità a livello capillare in merito
        alla gestione in sicurezza di tutti i processi che la rendono soggetta.
      </Paragraph>
      <Paragraph className={'my-2 max-w-[586px]'}>
        Il gestore deve riportare nel Documento il proprio impegno a realizzare,
        adottare, nonché' a mantenere e ricercare il miglioramento continuo del
        proprio sistema di gestione della sicurezza.
      </Paragraph>
      <Paragraph className={'max-w-[586px]'}>
        Motivo per il quale, UnoSicurezza propone una vasta gamma di corsi che
        possano soddisfare le richieste del gestore e che rispettino l’ottica
        obbligatoria della formazione continua (D. lgs. 105/2015 art. 14
        all’Appendice 1 dell’Allegato B). Corsi fatti su misura, grazie alla
        collaborazione con il vostro gruppo HS.
      </Paragraph>
      <Heading level={4} className={'my-6'}>
        Cosa include il servizio
      </Heading>
      {/* Service List Components */}
      <ServiceList items={serviceItems} />
    </div>
  );
};

export default DetailsLeftSide;
