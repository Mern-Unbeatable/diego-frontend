import { BiUpload } from 'react-icons/bi';
import { H2, H4 } from '../ui/Heading';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import P from '../ui/P';

const RequestInformationForm = ({
  title = 'Richiedi informazioni',
  subTitle = 'Compila il form per richiedere informazioni sul servizio',
  privacyDescription = 'Il sottoscritto autorizza il trattamento dei dati personali nel rispetto della vigente normativa sulla protezione dei dati personali ed, in particolare, il Regolamento Europeo per la protezione dei dati personali 2016/679, il d.lgs. 30/06/2003 n. 196 e successive modifiche e integrazioni, come modificato da ultimo dal d.lgs. 10/08/2018 n. 101. autorizza inoltre, il ricevente a trattare i dati per la finalità di fornitura dei servizi richiesti per. i lo si contatta.',
  inputFields = {
    leftColumn: [
      { name: 'name', placeholder: 'Nome', title: 'Nome *', type: 'text' },
      {
        name: 'azienda',
        placeholder: 'Azienda',
        title: 'Azienda *',
        type: 'text',
      },
      {
        name: 'telefono',
        placeholder: 'Telefono',
        title: 'Telefono *',
        type: 'number',
      },
    ],
    rightColumn: [
      {
        name: 'cognome',
        placeholder: 'Cognome',
        title: 'Cognome *',
        type: 'text',
      },
      { name: 'iva', placeholder: 'P.IVA', title: 'P.IVA', type: 'text' },
      { name: 'email', placeholder: 'Email', title: 'Email *', type: 'email' },
    ],
  },
  textAreaConfig = {
    title: 'Messaggio *',
    name: 'textarea',
    placeholder: 'type you messaggio',
  },
  onSubmit,
}) => {
  const handleSubmitDettagli = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const textData = Object.fromEntries(formData);

    const files = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'file' && value instanceof File) {
        files.push({
          name: value.name,
          size: (value.size / 1024 / 1024).toFixed(2) + ' MB',
          type: value.type,
        });
      }
    }

    const submitData = {
      ...textData,
      files: files,
    };

    console.log('Form Data:', submitData);

    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(submitData);
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    console.log('Selected files in change handler:', files);
  };

  return (
    <div className="bg-[#FFF5E6] px-8 py-6">
      {/* title */}
      <H2 h2={title} />

      {/* subTitle */}
      <H4 className={''} h4={subTitle} />

      <form onSubmit={handleSubmitDettagli}>
        <div className="flex gap-6">
          {/* Left Column */}
          <div className="flex flex-col">
            {inputFields.leftColumn.map((field, index) => (
              <Input
                key={index}
                TClassName={''}
                className={'bg-white'}
                name={field.name}
                placeholder={field.placeholder}
                title={field.title}
                type={field.type}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {inputFields.rightColumn.map((field, index) => (
              <Input
                key={index}
                TClassName={''}
                className={'bg-white'}
                name={field.name}
                placeholder={field.placeholder}
                title={field.title}
                type={field.type}
              />
            ))}
          </div>
        </div>

        <TextArea
          title={textAreaConfig.title}
          name={textAreaConfig.name}
          placeholder={textAreaConfig.placeholder}
          TClassName={''}
          className={'bg-white'}
        />

        <div className="flex items-center justify-center p-4">
          <div className="w-full">
            <H4 h4={'Allega documenti (PDF, Word, Excel)'} />

            <label className="mt-4 block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center transition-colors hover:border-orange-400 hover:bg-orange-50">
              <input
                type="file"
                multiple
                name="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleChange}
                className="hidden"
              />

              <BiUpload
                className="mx-auto mb-4 h-12 w-12 text-gray-400"
                strokeWidth={1.5}
              />

              <p className="mb-1 text-gray-700">
                Clicca per caricare i file o trascinali qui
              </p>

              <p className="text-sm text-gray-500">Massimo 25MB per file</p>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <H4 className={'text-[#C43216]'} h4={'Informativa Privacy'} />
          <div className="mt-2 bg-[#F1F9F6] px-9 py-5">
            {/* description */}
            <P p={privacyDescription} />
          </div>
        </div>

        <button
          type={'submit'}
          className={`mt-7 w-full rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]`}
        >
          Invia richiesta
        </button>
      </form>
    </div>
  );
};

export default RequestInformationForm;
