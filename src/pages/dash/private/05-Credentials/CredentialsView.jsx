import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/ui/layouts/Card';
import { FaChevronLeft, FaRegCopy } from 'react-icons/fa';

const CredentialsView = () => {
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
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <div className="px-4 py-6 md:px-6 md:py-8">
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 border border-gray-100"
            >
              <FaChevronLeft className="text-gray-600 text-xs" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Nuove credenziali ricevute
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Nome utente*
                </label>
                <div className="flex items-center justify-between rounded-md bg-[#f3faf6] px-3.5 py-2 text-xs md:text-sm">
                  <span className="text-gray-700 font-medium">{credentials.username}</span>
                  <button
                    onClick={() => copyToClipboard(credentials.username)}
                    aria-label="Copia username"
                    className="text-gray-500 hover:text-gray-800 transition"
                  >
                    <FaRegCopy size={13} />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Password*
                </label>
                <div className="flex items-center justify-between rounded-md bg-[#f3faf6] px-3.5 py-2 text-xs md:text-sm">
                  <span className="text-gray-700 font-medium">{credentials.password}</span>
                  <button
                    onClick={() => copyToClipboard(credentials.password)}
                    aria-label="Copia password"
                    className="text-gray-500 hover:text-gray-800 transition"
                  >
                    <FaRegCopy size={13} />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Nome del corso*
                </label>
                <div className="rounded-md bg-[#f3faf6] px-3.5 py-2 text-xs md:text-sm text-gray-600 font-medium">
                  {credentials.courseName}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Invia da*
                </label>
                <div className="rounded-md bg-[#f3faf6] px-3.5 py-2 text-xs md:text-sm text-gray-600 font-medium">
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

export default CredentialsView;
