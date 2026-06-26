import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

export default function ServiceForm({ title }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        azienda: '',
        piva: '',
        telefono: '',
        email: '',
        messaggio: '',
        privacy: false
    });

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {
        setFiles(prev => [...prev, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc', '.docx'],
            'application/vnd.ms-excel': ['.xls', '.xlsx']
        },
        maxSize: 25 * 1024 * 1024 // 25MB
    });

    const removeFile = (indexToRemove) => {
        setFiles(files.filter((_, index) => index !== indexToRemove));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return `0 ${t('servicesPages.section19.bytes')}`;
        const k = 1024;
        const sizes = [
            t('servicesPages.section19.bytes'),
            t('servicesPages.section19.kb'),
            t('servicesPages.section19.mb'),
            t('servicesPages.section19.gb'),
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Create FormData object for file upload
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
        files.forEach(file => {
            submitData.append('documents', file);
        });

        try {
            // Replace with your API endpoint
            // const response = await axios.post('/api/service-request', submitData);
            console.log('Form submitted:', formData);
            console.log('Files:', files);

            // Reset form after successful submission
            // setFormData(initialState);
            // setFiles([]);
            alert(t('servicesPages.section19.successAlert'));
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(t('servicesPages.section19.errorAlert'));
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-[#FFF5E6] rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('servicesPages.section19.title')}
            </h2>
            <p className="text-gray-500 mb-6">
                {t('servicesPages.section19.subtitle', {
                    service: title || t('servicesPages.section19.defaultService'),
                })}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('servicesPages.section19.firstName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nome"
                            required
                            value={formData.nome}
                            onChange={handleChange}
                            className=" bg-[#FFFFFF] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"

                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('servicesPages.section19.lastName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="cognome"
                            required
                            value={formData.cognome}
                            onChange={handleChange}
                            className="w-full bg-[#FFFFFF] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"

                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('servicesPages.section19.company')}
                        </label>
                        <input
                            type="text"
                            name="azienda"
                            value={formData.azienda}
                            onChange={handleChange}
                            className="w-full bg-[#FFFFFF] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"

                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('servicesPages.section19.vat')}
                        </label>
                        <input
                            type="text"
                            name="piva"
                            value={formData.piva}
                            onChange={handleChange}
                            className="w-full bg-[#FFFFFF] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"

                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('servicesPages.section19.phone')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            required
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border bg-[#FFFFFF] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"

                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('servicesPages.section19.email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border bg-[#FFFFFF] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"

                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('servicesPages.section19.message')}
                    </label>
                    <textarea
                        name="messaggio"
                        rows="4"
                        value={formData.messaggio}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border bg-[#FFFFFF] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"

                    ></textarea>
                </div>

                {/* File Upload */}
                <div >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('servicesPages.section19.attachDocuments')}
                    </label>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition bg-[#F5F5F5]
                    ${isDragActive ? 'border-blue-500 ' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                        <input {...getInputProps()} />
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-12-4h.01"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                            {isDragActive ? (
                                t('servicesPages.section19.dropHere')
                            ) : (
                                <>
                                    <span className="font-medium text-blue-600">{t('servicesPages.section19.clickToUpload')}</span> {t('servicesPages.section19.orDragHere')}
                                </>
                            )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {t('servicesPages.section19.maxFileSize')}
                        </p>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-[#F5F5F5] rounded-lg p-2">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 truncate max-w-[200px]">{file.name}</span>
                                        <span className="text-xs text-gray-400">({formatFileSize(file.size)})</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Privacy Checkbox */}

                <div className=" items-start">
                    <b className='text-[#C43216] '>{t('servicesPages.section19.privacyTitle')}</b>

                    <div className=" bg-[#F1F9F6] rounded-3xl p-5 mt-5">
                        <label className="text-sm text-gray-600">
                            {t('servicesPages.section19.privacyText')}
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#73BFA1] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            {t('servicesPages.section19.sending')}
                        </span>
                    ) : (
                        t('servicesPages.section19.submit')
                    )}
                </button>
            </form>
        </div>
    )
}
