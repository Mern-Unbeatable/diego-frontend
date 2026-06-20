import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, X, Upload, FileText, Paperclip } from 'lucide-react';

const AggiungiModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    actionId: '',
    tipologia: 'AUTOCERTATO',
    settore: 'Sicurezza',
    sezioneCollassabile: 'CIG (flusso)',
    price: ''
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => ({
      id: Math.random().toString(36),
      name: file.name,
      url: URL.createObjectURL(file),
      type: 'image'
    }));
    setUploadedImages([...uploadedImages, ...imageUrls]);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const docs = files.map(file => ({
      id: Math.random().toString(36),
      name: file.name,
      type: file.type,
      size: file.size
    }));
    setUploadedDocuments([...uploadedDocuments, ...docs]);
  };

  const removeImage = (id) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== id));
  };

  const removeDocument = (id) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id));
  };

  const getDocumentIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📘';
    return '📎';
  };

  const getDocumentColor = (type) => {
    if (type.includes('pdf')) return 'bg-red-100 border-red-300';
    if (type.includes('word') || type.includes('document')) return 'bg-blue-100 border-blue-300';
    return 'bg-gray-100 border-gray-300';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="relative h-full max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl ">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center gap-4 bg-white px-6 py-4 mb-6">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Aggiungi nuovi corsi</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titolo del Corso */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Titolo del Corso<span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              placeholder="Titolo"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
            />
          </div>

          {/* Descrizione */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Descrizione<span className='text-red-600'>*</span>
            </label>
            <textarea
              placeholder="Aggiungi un'ulteriore descrizione del corso oppure riferimenti legislativi"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
            />
          </div>

          {/* ID Corso */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              ID Corso<span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              placeholder="Genera automaticamente"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
            />
          </div>

          {/* ID Azione */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              ID Azione<span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              placeholder="Genera automaticamente"
              value={formData.actionId}
              onChange={(e) => setFormData({ ...formData, actionId: e.target.value })}
              className="w-full rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
            />
          </div>

          {/* Tipologia */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Tipologia<span className='text-red-600'>*</span>
            </label>
            <div className="relative">
              <select
                value={formData.tipologia}
                onChange={(e) => setFormData({ ...formData, tipologia: e.target.value })}
                className="w-full appearance-none rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
              >
                <option>AUTOCERTATO</option>
                <option>CERTIFICATO</option>
                <option>ALTRO</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Settore */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Settore<span className='text-red-600'>*</span>
            </label>
            <div className="relative">
              <select
                value={formData.settore}
                onChange={(e) => setFormData({ ...formData, settore: e.target.value })}
                className="w-full appearance-none rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
              >
                <option>Sicurezza</option>
                <option>Ambiente</option>
                <option>Qualità</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Sezione Collassabile */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Sezione Collassabile<span className='text-red-600'>*</span>
            </label>
            <div className="relative">
              <select
                value={formData.sezioneCollassabile}
                onChange={(e) => setFormData({ ...formData, sezioneCollassabile: e.target.value })}
                className="w-full appearance-none rounded-lg bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
              >
                <option>CIG (flusso)</option>
                <option>Altro flusso</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Caricamento materiale */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Caricamento materiale<span className='text-red-600'>*</span>
            </label>

            {/* Image Preview */}
            {uploadedImages.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative h-20 w-20 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Quiz Button */}
            <button
              type="button"
              className="mb-3 flex items-center gap-2 rounded-full bg-[#73BFA1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5fa889] transition-colors"
            >
              <span className="text-lg"></span>
              Add Quiz
            </button>
          </div>

          {/* Aggiungi documenti al tuo corso */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Aggiungi documenti al tuo corso<span className='text-red-600'>*</span>
            </label>

            {/* Document Preview */}
            {uploadedDocuments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedDocuments.map((doc) => (
                  <div key={doc.id} className={`relative rounded-lg border-2 p-3 ${getDocumentColor(doc.type)}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getDocumentIcon(doc.type)}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">{doc.name}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(doc.id)}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File Upload Buttons */}
            <div className="flex gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-[#f1f9f6] px-4 py-2 text-sm hover:border-[#73BFA1] hover:bg-[#73BFA1]/5">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">Immagini</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-[#f1f9f6] px-4 py-2 text-sm hover:border-[#73BFA1] hover:bg-[#73BFA1]/5">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
                <Paperclip className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">Documenti</span>
              </label>
            </div>
          </div>

          {/* Prezzo di vendita */}
          <div>
            <label className="mb-2 block text-base font-semibold text-gray-900">
              Prezzo di vendita (compreso di IVA se dovuta)<span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              placeholder="€80"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-[#f1f9f6] px-4 py-3 text-sm focus:border-[#73BFA1] focus:outline-none focus:ring-2 focus:ring-[#73BFA1]/20"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#73BFA1] px-8 py-3 text-sm font-medium text-white hover:bg-[#5fa889] transition-colors"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AggiungiModal;