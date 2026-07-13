import React from 'react';
import { X } from 'lucide-react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Button } from '../../../../../components/ui';

const CreateTicketModal = ({
  isOpen,
  onClose,
  onSubmit,
  subject,
  setSubject,
  description,
  setDescription,
  file,
  handleFileChange,
  handleDragOver,
  handleDrop,
}) => {
  if (!isOpen) return null;

  const maxChars = 2000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#111111]/35 p-6  backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-xl bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Apri un ticket
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Subject Field */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-900">
              Oggetto<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Inserisci una breve descrizione"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-[#E5F5ED] bg-[#F6FBF9] px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-900">
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
              className="w-full resize-none rounded-lg border border-[#E5F5ED] bg-[#F6FBF9] px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
            />
            <div className="mt-1 text-right text-xs text-gray-500">
              {description.length}/{maxChars}
            </div>
          </div>

          {/* File Upload Area */}
          <div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="relative rounded-lg border-2 border-dashed border-[#C5E8D9] bg-[#F6FBF9] p-8 text-center"
            >
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                className="hidden"
                accept="*"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="mb-3 text-4xl text-[#73BFA1]" />
                  <p className="mb-1 text-sm font-medium text-gray-900">
                    Allega dei file
                  </p>
                  <p className="text-xs text-gray-500">
                    Trascina e rilascia oppure{' '}
                    <span className="text-[#73BFA1] underline">clicca qui</span>{' '}
                    per caricare i file
                  </p>
                </div>
              </label>
              {file && (
                <div className="mt-4 text-sm text-gray-700">
                  File selezionato:{' '}
                  <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Dimensioni massima permessa: massimo 20 MB per allegato
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              label="Annulla"
              variant="outline"
              type="button"
              className="rounded-full border-red-400 text-red-500 hover:bg-red-50"
              onClick={onClose}
            />
            <Button
              label="Invia"
              type="submit"
              className="rounded-full bg-[#73BFA1] hover:bg-[#5fa488]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
