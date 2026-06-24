import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/layouts/Card';
import { Heading } from '../../../components/ui';
import { FaChevronLeft, FaRegCopy } from 'react-icons/fa';

const CredentialsReceived = () => {
  const navigate = useNavigate();

  const credentials = {
    username: 'gladys512',
    password: 'B48sghjJckxwm',
    courseName: 'Seveso Training',
    sentBy: "Dall'amministratore dell'azienda",
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // small visual feedback could be added; keeping simple
      console.log('copied', text);
    } catch (e) {
      console.error('copy failed', e);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="px-4 py-6 md:px-8 md:py-10">
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="mb-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <Heading level={3} className="mb-6">
              Nuove credenziali ricevute
            </Heading>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Nome utente*
                </label>
                <div className="flex items-center justify-between rounded-md bg-[#f3faf6] px-4 py-3">
                  <span className="text-gray-700">{credentials.username}</span>
                  <button
                    onClick={() => copyToClipboard(credentials.username)}
                    aria-label="Copia username"
                    className="text-gray-600"
                  >
                    <FaRegCopy />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Password*
                </label>
                <div className="flex items-center justify-between rounded-md bg-[#f3faf6] px-4 py-3">
                  <span className="text-gray-700">{credentials.password}</span>
                  <button
                    onClick={() => copyToClipboard(credentials.password)}
                    aria-label="Copia password"
                    className="text-gray-600"
                  >
                    <FaRegCopy />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Nome del corso*
                </label>
                <div className="rounded-md bg-[#f3faf6] px-4 py-3 text-gray-600">
                  {credentials.courseName}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Invia da*
                </label>
                <div className="rounded-md bg-[#f3faf6] px-4 py-3 text-gray-600">
                  {credentials.sentBy}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CredentialsReceived;
