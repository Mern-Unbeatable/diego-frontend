import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackpackIcon } from 'lucide-react';
import { BiArrowBack } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import {
  Divider,
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../../../components/ui';

const CompanyInfoForm = () => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleChange = (value) => {
    setSelected(selected === value ? '' : value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    // 🔥 NEXT STEP CONTROL
    navigate('/auth/register/setup-password');
  };

  return (
    <div className="flex h-auto flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-4 px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <Paragraph className="flex items-center gap-x-2 text-sm text-gray-600">
            <Link
              to={`/auth/register/setup-role`}
              className="flex items-center gap-x-2"
            >
              <BiArrowBack className="text-lg" /> Back
            </Link>
          </Paragraph>
          <Paragraph className="text-sm text-gray-600">Steps 2/3</Paragraph>
        </div>

        <Heading level={4}>Informazioni aziendali</Heading>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <Label
              htmlFor="companyName"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              Ragione sociale*
            </Label>
            <InputField
              type="text"
              name="companyName"
              placeholder="Inserisci il nome completa dell'azienda"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="office"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              Indirizzo sede legale*
            </Label>
            <InputField
              type="text"
              name="office"
              placeholder="Inserisci l'indirizzo della sede legale dell'azienda"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="vatNumber"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              VAT Number
            </Label>
            <InputField
              type="number"
              name="vatNumber"
              placeholder="Inserisci la Partita IVA"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="taxCode"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              Codice fiscale (se diverso dalla P. IVA)*
            </Label>
            <InputField
              type="number"
              name="taxCode"
              placeholder="987456321"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="email"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              E-mail di contatto*
            </Label>
            <InputField
              name="email"
              placeholder="example@gmail.com"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>
          <div className="mx-auto flex w-full justify-end py-2">
            <button
              type="submit"
              className="w-[100px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] py-2 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
            >
              Procedi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
