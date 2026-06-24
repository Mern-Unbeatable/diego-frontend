import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

import {
  Heading,
  Paragraph,
  InputField,
  Label,
} from '../../../../../components/ui';

const SetupPassword = () => {
  const navigate = useNavigate();

  const handlePassWordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log('Password data:', data);
    navigate('/dashboard/super-admin');
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header with Steps and Close */}
      <div className="mb-6 flex items-center justify-between">
        <Paragraph className="text-sm text-gray-600">Steps 3/3</Paragraph>
      </div>

      <Heading level={3} className="mb-6">
        Crea la tua password
      </Heading>

      <form onSubmit={handlePassWordSubmit} action="" className="space-y-2">
        <div className="mb-6">
          <Label
            htmlFor="password"
            required={true}
            className="mb-2 block text-xl font-medium"
          >
            Nuova password*
          </Label>
          <InputField
            type="password"
            name="password"
            placeholder="Inserisci la password"
            className="rounded-2xl border border-green-100 bg-white px-4 py-3"
          />
        </div>

        <Heading level={4}>
          Lunghezza minima: 8 caratteri (consigliati 12 o più)
        </Heading>
        <div className="my-6 flex flex-col gap-3">
          <Heading level={4}>Deve includere almeno:</Heading>
          <Paragraph>1 lettera maiuscola (A–Z)</Paragraph>
          <Paragraph>1 lettera minuscola (a–z)</Paragraph>
          <Paragraph>1 numero (0–9)</Paragraph>
          <Paragraph>1 carattere speciale (!, ?, $, %, &)</Paragraph>
        </div>
        <Heading level={4}>
          Non deve contenere nome utente, nome reale o altre informazioni
          facilmente intuibili
        </Heading>
        <div className="mb-6">
          <Label
            htmlFor="password"
            required={true}
            className="mb-2 block text-xl font-medium"
          >
            Conferma password*
          </Label>
          <InputField
            type="password"
            name="password"
            placeholder="842000@Sa"
            className="rounded-2xl border border-green-100 bg-white px-4 py-3"
          />
        </div>
        {/* Footer with Procedi button */}
        <div className="mx-auto flex w-full max-w-3xl justify-end px-6 py-8">
          <button
            type="submit"
            className="w-[140px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
          >
            Procedi
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupPassword;
