import React, { useState } from 'react';
import ContactForm from './ContactForm';
import { Container } from '../ui';
import ContactFormModal from './ContactFormModal';

const CollaborationSection = ({ title, subText, description, bottomText, bulletPoints, buttonText, contactFormTitle, additionalFields = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Container>
            <div className="max-w-6xl mx-auto px-5 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {description}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{subText}</p>
                        <ul className="space-y-3 mb-8">
                            {bulletPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-[#73BFA1] mt-1">•</span>
                                    <span className="text-gray-700 text-sm">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {bottomText}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-[#73BFA1] text-white py-3 rounded-3xl font-semibold transition"
                        >
                            {buttonText}
                        </button>
                    </div>

                    {/* Right Contact Form */}
                    <ContactForm
                        title={contactFormTitle}
                        additionalFields={additionalFields}
                    />
                </div>
            </div>

            {/* Modal */}
            <ContactFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Container>
    );
};

export default CollaborationSection;