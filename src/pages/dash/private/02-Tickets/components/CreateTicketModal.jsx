// import { createPortal } from 'react-dom';
// import { CloudUpload, X } from 'lucide-react';

// const CreateTicketModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   subject,
//   setSubject,
//   description,
//   setDescription,
//   file,
//   setFile,
//   handleFileChange,
//   handleDragOver,
//   handleDrop,
//   isSubmitting = false,
// }) => {
//   if (!isOpen) return null;

//   const maxChars = 2000;

//   return createPortal(
//     <div
//       className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
//       onClick={() => {
//         if (!isSubmitting) onClose?.();
//       }}
//       role="presentation"
//     >
//       <div
//         className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
//         onClick={(event) => event.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="create-ticket-title"
//       >
//         <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
//           <h2
//             id="create-ticket-title"
//             className="text-base font-semibold text-[#202020] sm:text-lg"
//           >
//             Apri un ticket
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isSubmitting}
//             className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
//             aria-label="Chiudi"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <form
//           onSubmit={onSubmit}
//           className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5"
//         >
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-800">
//               Oggetto<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Inserisci una breve descrizione"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               disabled={isSubmitting}
//               className="h-11 w-full rounded-lg border border-[#E5F5ED] bg-[#F6FBF9] px-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#73BFA1] disabled:opacity-60"
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-800">
//               Descrizione<span className="text-red-500">*</span>
//             </label>
//             <textarea
//               placeholder="Descrivi quale problema hai riscontrato"
//               value={description}
//               onChange={(e) => {
//                 if (e.target.value.length <= maxChars) {
//                   setDescription(e.target.value);
//                 }
//               }}
//               rows={5}
//               disabled={isSubmitting}
//               className="w-full resize-none rounded-lg border border-[#E5F5ED] bg-[#F6FBF9] px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#73BFA1] disabled:opacity-60"
//             />
//             <div className="mt-1 text-right text-xs text-gray-500">
//               {description.length}/{maxChars}
//             </div>
//           </div>

//           <div>
//             <div
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//               className="relative rounded-lg border-2 border-dashed border-[#C5E8D9] bg-[#F6FBF9] p-5 text-center sm:p-6"
//             >
//               <input
//                 type="file"
//                 id="private-ticket-file-upload"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/*"
//                 disabled={isSubmitting}
//               />
//               <label
//                 htmlFor="private-ticket-file-upload"
//                 className={`cursor-pointer ${isSubmitting ? 'pointer-events-none opacity-60' : ''}`}
//               >
//                 <div className="flex flex-col items-center">
//                   <CloudUpload className="mb-2 h-8 w-8 text-[#73BFA1]" />
//                   <p className="mb-1 text-sm font-medium text-gray-900">
//                     Allega dei file
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Trascina e rilascia oppure{' '}
//                     <span className="text-[#73BFA1] underline">clicca qui</span>{' '}
//                     per caricare
//                   </p>
//                 </div>
//               </label>
//               {file ? (
//                 <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-700">
//                   <span className="max-w-full truncate">
//                     <span className="font-medium">{file.name}</span>
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => setFile(null)}
//                     disabled={isSubmitting}
//                     className="text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     Rimuovi
//                   </button>
//                 </div>
//               ) : null}
//             </div>
//             <p className="mt-2 text-xs text-gray-500">
//               Dimensioni massima: 20 MB (solo immagini)
//             </p>
//           </div>

//           <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end sm:gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isSubmitting}
//               className="inline-flex h-10 items-center justify-center rounded-full border border-[#ed6f63] px-6 text-sm font-semibold text-[#e15241] hover:bg-[#fff5f4] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Annulla
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="inline-flex h-10 items-center justify-center rounded-full bg-[#73BFA1] px-6 text-sm font-semibold text-white hover:bg-[#5fa488] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {isSubmitting ? 'Invio in corso...' : 'Invia'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body,
//   );
// };

// export default CreateTicketModal;




import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { CloudUpload, X } from 'lucide-react';

const CreateTicketModal = ({
  isOpen,
  onClose,
  onSubmit,
  subject,
  setSubject,
  description,
  setDescription,
  file,
  setFile,
  handleFileChange,
  handleDragOver,
  handleDrop,
  isSubmitting = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    // If file is already a File/Blob object, create an object URL for preview
    if (file instanceof Blob) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    // If it's already a string (e.g. an existing URL), use it directly
    if (typeof file === 'string') {
      setPreviewUrl(file);
    }
  }, [file]);

  if (!isOpen) return null;

  const maxChars = 2000;
  const fileName = typeof file === 'string' ? file.split('/').pop() : file?.name;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={() => {
        if (!isSubmitting) onClose?.();
      }}
      role="presentation"
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-ticket-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <h2
            id="create-ticket-title"
            className="text-base font-semibold text-[#202020] sm:text-lg"
          >
            Apri un ticket
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Chiudi"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              Oggetto<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Inserisci una breve descrizione"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSubmitting}
              className="h-11 w-full rounded-lg border border-[#E5F5ED] bg-[#F6FBF9] px-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#73BFA1] disabled:opacity-60"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              Descrizione<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Descrivi quale problema hai riscontrato"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) {
                  setDescription(e.target.value);
                }
              }}
              rows={5}
              disabled={isSubmitting}
              className="w-full resize-none rounded-lg border border-[#E5F5ED] bg-[#F6FBF9] px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#73BFA1] disabled:opacity-60"
            />
            <div className="mt-1 text-right text-xs text-gray-500">
              {description.length}/{maxChars}
            </div>
          </div>

          <div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="relative rounded-lg border-2 border-dashed border-[#C5E8D9] bg-[#F6FBF9] p-5 text-center sm:p-6"
            >
              <input
                type="file"
                id="private-ticket-file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                disabled={isSubmitting}
              />

              {!previewUrl ? (
                <label
                  htmlFor="private-ticket-file-upload"
                  className={`cursor-pointer ${isSubmitting ? 'pointer-events-none opacity-60' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <CloudUpload className="mb-2 h-8 w-8 text-[#73BFA1]" />
                    <p className="mb-1 text-sm font-medium text-gray-900">
                      Allega dei file
                    </p>
                    <p className="text-xs text-gray-500">
                      Trascina e rilascia oppure{' '}
                      <span className="text-[#73BFA1] underline">clicca qui</span>{' '}
                      per caricare
                    </p>
                  </div>
                </label>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="relative mb-3 w-full max-w-xs overflow-hidden rounded-lg border border-[#C5E8D9] bg-white">
                    <img
                      src={previewUrl}
                      alt="Anteprima allegato"
                      className="max-h-64 w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      disabled={isSubmitting}
                      className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Rimuovi immagine"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <label
                    htmlFor="private-ticket-file-upload"
                    className={`cursor-pointer text-xs text-[#73BFA1] underline ${isSubmitting ? 'pointer-events-none opacity-60' : ''}`}
                  >
                    Cambia immagine
                  </label>
                </div>
              )}

              {file ? (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-700">
                  <span className="max-w-full truncate">
                    <span className="font-medium">{fileName}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    disabled={isSubmitting}
                    className="text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Rimuovi
                  </button>
                </div>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Dimensioni massima: 20 MB (solo immagini)
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#ed6f63] px-6 text-sm font-semibold text-[#e15241] hover:bg-[#fff5f4] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#73BFA1] px-6 text-sm font-semibold text-white hover:bg-[#5fa488] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Invio in corso...' : 'Invia'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CreateTicketModal;