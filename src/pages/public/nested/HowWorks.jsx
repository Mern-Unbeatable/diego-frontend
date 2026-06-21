'use client';
import { howWorksData } from '../../../data/howWorksData';

const HowWorks = () => {
    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 md:p-12">
            {/* Header Section */}
            <div className="mx-auto mb-16 max-w-6xl">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    Trova la soluzione su misura per te
                </h1>
                <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
                    La tua formazione, senza confini Accedi ai nostri corsi di sicurezza sul lavoro,
                    privacy e igiene alimentare. Corsi sempre aggiornati e progettati per le tue esigenze.
                    Ovunque e in qualsiasi momento: la nostra piattaforma eLearning ti offre una formazione
                    smart, efficace e completamente conforme alle richieste delle autorità. Investi nella
                    tua crescita. Scegli la qualità, scegli il futuro.
                </p>
                <span className="text-[#73BFA1]">"Esplora tutti i nostri corsi"</span>
            </div>

            {howWorksData.map((section, index) => {
                const isReverse = section.reverse;
                const sectionSpacingClass = index === 0 ? 'mb-16' : index === 1 ? 'mb-16 mt-12' : 'mt-12';

                const textBlock = (
                    <div className={`flex-1 ${isReverse ? 'order-2 md:order-1' : ''}`}>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">{section.title}</h2>

                        {section.contents.map((content, contentIndex) => (
                            <p
                                key={`${section.id}-${contentIndex}`}
                                className={`text-sm leading-relaxed text-gray-600 md:text-base ${contentIndex !== section.contents.length - 1 || section.badge ? 'mb-4' : ''
                                    }`}
                            >
                                {content}
                            </p>
                        ))}

                        {section.badge && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                {section.badge}
                            </div>
                        )}
                    </div>
                );

                const imageBlock = (
                    <div className={`relative flex-1 ${isReverse ? 'order-1 md:order-2' : ''}`}>
                        <img src={section.image} alt="" className="h-auto w-full" />
                    </div>
                );

                return (
                    <div
                        key={section.id}
                        className={`mx-auto max-w-6xl flex flex-col items-center gap-8 md:flex-row md:gap-12 ${sectionSpacingClass}`}
                    >
                        {isReverse ? (
                            <>
                                {textBlock}
                                {imageBlock}
                            </>
                        ) : (
                            <>
                                {imageBlock}
                                {textBlock}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default HowWorks;