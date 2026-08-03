import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/ui/layouts/Card';
import { FaChevronLeft, FaRegCopy } from 'react-icons/fa';
import {
  getMyCredentialsService,
  markCredentialViewedService,
} from '../../../../features/private/privateService';

const CredentialsView = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(null);
  const [allCredentials, setAllCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadCredentials = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getMyCredentialsService();
        const payload = response?.data ?? response;
        const list = payload?.credentials ?? [];
        const latest = payload?.latest ?? list[0] ?? null;

        if (!active) return;

        setAllCredentials(list);
        setCredentials(latest);

        if (latest?.id && !latest.viewedAt) {
          await markCredentialViewedService(latest.id).catch(() => {});
        }
      } catch (e) {
        if (active) {
          setError('Impossibile caricare le credenziali.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCredentials();
    return () => {
      active = false;
    };
  }, []);

  const copyToClipboard = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error('copy failed', e);
    }
  };

  const selectCredential = async (item) => {
    setCredentials(item);
    if (item?.id && !item.viewedAt) {
      await markCredentialViewedService(item.id).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-2xl text-sm text-gray-500">Caricamento credenziali...</div>
      </div>
    );
  }

  if (error || !credentials) {
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
              <p className="text-sm text-gray-600">
                {error || 'Nessuna credenziale disponibile. Le credenziali compaiono quando un amministratore o licenziatario ti assegna un corso.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        {allCredentials.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {allCredentials.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectCredential(item)}
                className={`rounded-full px-3 py-1 text-xs border ${
                  credentials.id === item.id
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {item.courseName}
              </button>
            ))}
          </div>
        )}

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
                  <span className="text-gray-700 font-medium">
                    {credentials.password || 'Usa la password del tuo account esistente'}
                  </span>
                  {credentials.password ? (
                    <button
                      onClick={() => copyToClipboard(credentials.password)}
                      aria-label="Copia password"
                      className="text-gray-500 hover:text-gray-800 transition"
                    >
                      <FaRegCopy size={13} />
                    </button>
                  ) : null}
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
