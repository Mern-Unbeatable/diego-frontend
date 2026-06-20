import { useState } from 'react';
import { ChevronLeft, CheckCircle, Star } from 'lucide-react';
import detail from '../../../../src/assets/images/course/course.png';
import PricingCardsModal from '../../../components/training/PricingCardsModal';

const CourseDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14">

                <div className="mb-8 flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5 text-green-600" />
                    <button className="text-green-600 hover:text-green-700 font-semibold">Torna al catalogo</button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left Content */}
                    <div className="md:col-span-2">
                        {/* Course Image */}
                        <div className="mb-6 overflow-hidden rounded-lg bg-gray-200 aspect-video">
                            <img
                                src={detail}
                                alt="Course"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Category Badge */}
                        <p className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#73BFA1]">
                            SAFETY
                        </p>

                        {/* Rating */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="h-5 w-5 text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-600">4/5 Stelle</span>
                        </div>

                        {/* Course Title and Description */}
                        <h1 className="mb-6 text-3xl font-bold text-gray-900">Formazione SEVESO</h1>
                        <p className="mb-8 text-gray-700 leading-relaxed">
                            Corso avanzato per la gestione dei rischi nelle industrie a rischio di incidente rilevante secondo il Decreto Legislativo 105/2015. Il corso fornisce competenze specifiche per la prevenzione degli incidenti rilevanti e la gestione delle emergenze.
                        </p>

                        {/* Objectives Section */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">Obiettivi</h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <span className="text-gray-700">Comprendere la normativa SEVESO III</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <span className="text-gray-700">Identificare i rischi di incidente rilevante</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <span className="text-gray-700">Sviluppare piani di emergenza efficaci</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <span className="text-gray-700">Gestire la comunicazione in caso di emergenza</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Pricing Card */}
                    <div className="rounded-lg bg-green-50 p-6 h-fit">
                        <div className="mb-6 flex items-baseline gap-3">
                            <span className="text-2xl font-bold text-gray-800">€25.00</span>
                            <span className="text-xl font-bold text-[#73BFA1]">€18.00</span>
                            <span className="text-xs text-gray-600">Prezzo speciale</span>
                        </div>

                        <div className="mb-6 space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                                <span>Durata 16 ore</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                                <span>Codice:</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white hover:bg-[#73BFA1] transition mb-6"
                        >
                            Iscriviti ora
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <PricingCardsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CourseDetails;