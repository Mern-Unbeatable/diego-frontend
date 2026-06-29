import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { Heading, Paragraph, InputField, Label } from '../../../components/ui';

const PasswordSetupView = () => {
  const navigate = useNavigate();

  const handlePassWordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log('Password data:', data);
    navigate('/dashboard/super-admin');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header with Steps and Close */}
      <div className="mb-8 flex items-center justify-between">
        <Paragraph className="flex items-center gap-x-2 text-sm text-gray-600">
          <Link
            to={`/auth/register/setup-info`}
            className="flex items-center gap-x-2 transition-colors hover:text-[#73BFA1]"
          >
            <BiArrowBack className="text-lg" /> Back
          </Link>
        </Paragraph>
        <Paragraph className="text-sm font-medium text-gray-600">
          Steps 3/3
        </Paragraph>
      </div>

      <Heading level={4} className="mb-8 text-2xl font-bold text-gray-900">
        Crea la tua password
      </Heading>

      <form onSubmit={handlePassWordSubmit} className="space-y-6">
        {/* New Password Field */}
        <div>
          <Label
            htmlFor="newPassword"
            required={true}
            className="mb-2 block text-base font-semibold text-gray-800"
          >
            Nuova password*
          </Label>
          <InputField
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Inserisci la password"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1]/20 focus:outline-none"
          />
        </div>

        {/* Password Requirements */}
        <div className="space-y-4 rounded-xl bg-gray-50 p-6">
          <Heading level={5} className="text-sm font-semibold text-gray-800">
            Lunghezza minima: <span className="font-bold">8 caratteri</span>{' '}
            (consigliati 12 o più)
          </Heading>

          <div>
            <Heading
              level={5}
              className="mb-3 text-sm font-semibold text-gray-800"
            >
              Deve includere almeno:
            </Heading>
            <ul className="space-y-2 pl-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-[#73BFA1]">•</span> 1 lettera maiuscola
                (A–Z)
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-[#73BFA1]">•</span> 1 lettera minuscola
                (a–z)
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-[#73BFA1]">•</span> 1 numero (0–9)
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-[#73BFA1]">•</span> 1 carattere speciale
                (!, ?, $, %, &)
              </li>
            </ul>
          </div>

          <Heading level={5} className="text-sm font-semibold text-gray-800">
            Non deve contenere nome utente, nome reale o altre informazioni
            facilmente intuibili
          </Heading>
        </div>

        {/* Confirm Password Field */}
        <div>
          <Label
            htmlFor="confirmPassword"
            required={true}
            className="mb-2 block text-base font-semibold text-gray-800"
          >
            Conferma password*
          </Label>
          <InputField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="842000@Sa"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1]/20 focus:outline-none"
          />
        </div>

        {/* Footer with Procedi button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-8 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1]/50 focus:outline-none"
          >
            Procedi
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSetupView;
