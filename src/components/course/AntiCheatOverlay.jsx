import { createPortal } from 'react-dom';

const AntiCheatOverlay = ({ visible, message, onResume }) => {
  if (!visible || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <h3 className="text-xl font-semibold text-[#1d1d1d]">Sessione sospesa</h3>
        <p className="mt-4 text-base leading-relaxed text-[#5a5a5a]">
          {message || 'Per continuare la formazione devi confermare che sei ancora presente.'}
        </p>
        <p className="mt-3 text-xs text-[#7a7a7a]">
          Il tempo di lettura è in pausa finché non confermi la presenza. L&apos;evento viene
          registrato nel rapporto di formazione.
        </p>
        <button
          type="button"
          onClick={onResume}
          className="mt-6 w-full rounded-full bg-[#55B18D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#439678]"
        >
          Avanti per proseguire
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default AntiCheatOverlay;
