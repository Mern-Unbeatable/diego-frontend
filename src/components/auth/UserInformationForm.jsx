import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import {
    Heading,
    InputField,
    Label,
    Paragraph,
} from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { BackpackIcon } from 'lucide-react';
import { BiArrowBack } from 'react-icons/bi';

const UserInformationForm = () => {
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
        navigate("/auth/register/setup-profile/password");
    };

    return (
        <div className="flex h-auto flex-col bg-white ">
            <div className="mx-auto w-full max-w-5xl space-y-4 px-6 py-4">
                <div className="mb-6 flex items-center justify-between">
                    <Paragraph className=" flex items-center gap-x-2 text-sm text-gray-600"> <BiArrowBack /> Steps 2/3</Paragraph>
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <GrClose className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <Heading level={4}>Informazioni</Heading>

                <form onSubmit={handleFormSubmit}>
                    {/* Name */}
                    <div className="mb-3 flex w-full gap-5 transition-all duration-300">
                        <div className="w-full">
                            <Label
                                htmlFor="firstName"
                                required={true}
                                className="mb-2 block text-sm font-medium"
                            >
                                First name
                            </Label>
                            <InputField
                                type="text"
                                name="firstName"
                                placeholder="Type Your first Name"
                                className="rounded-2xl border border-green-100 bg-white px-4 py-3"
                            />
                        </div>
                        <div className="w-full">
                            <Label
                                htmlFor="lastName"
                                required={true}
                                className="mb-2 block text-sm font-medium"
                            >
                                Last name
                            </Label>
                            <InputField
                                type="text"
                                name="lastName"
                                placeholder="Type Your last Name"
                                className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <Label
                            htmlFor="lastName"
                            required={true}
                            className="mb-2 block text-sm font-medium"
                        >
                            Last name
                        </Label>
                        <InputField
                            type="date"
                            name="birthDate"
                            placeholder="Select Your birth date"
                            className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                        />
                    </div>

                    <div className="mb-6 flex w-full gap-5 transition-all duration-300">
                        <div className="w-full">
                            <Label
                                htmlFor="city"
                                required={true}
                                className="mb-2 block text-sm font-medium"
                            >
                                City
                            </Label>
                            <InputField
                                type="text"
                                name="city"
                                placeholder="Inserisci il luogo di nascita"
                                className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                            />
                        </div>
                        <div className="w-full">
                            <Label
                                htmlFor="country"
                                required={true}
                                className="mb-2 block text-sm font-medium"
                            >
                                Country
                            </Label>
                            <InputField
                                type="text"
                                name="country"
                                placeholder="Type Your country"
                                className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <Label
                            htmlFor="address"
                            required={true}
                            className="mb-2 block text-sm font-medium"
                        >
                            Address
                        </Label>
                        <InputField
                            type="text"
                            name="address"
                            placeholder="Via, numero civico, CAP, città, sigla provincia, paese"
                            className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                        />
                    </div>

                    <div className="mb-6">
                        <Label
                            htmlFor="companyName"
                            required={true}
                            className="mb-2 block text-sm font-medium"
                        >
                            Company Name
                        </Label>
                        <InputField
                            type="text"
                            name="companyName"
                            placeholder="Inserisci il nome dell'azienda"
                            className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                        />
                    </div>

                    <div className="mb-6">
                        <Label
                            htmlFor="office"
                            required={true}
                            className="mb-2 block text-sm font-medium"
                        >
                            Office
                        </Label>
                        <InputField
                            type="text"
                            name="office"
                            placeholder="Inserisci sede legale (Via, numero civico, CAP, città, sigla provincia, paese)"
                            className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
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
                            className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                        />
                    </div>

                    <div className="mb-6">
                        <Label
                            htmlFor="taxCode"
                            required={true}
                            className="mb-2 block text-sm font-medium"
                        >
                            Tax Code
                        </Label>
                        <InputField
                            type="number"
                            name="taxCode"
                            placeholder="Inserisci il codice fiscale"
                            className="rounded-2xl border text-sm border-green-100 bg-white px-4 py-3"
                        />
                    </div>

                    <Heading level={4}>Cittadinanza</Heading>

                    <div className="my-5 flex items-center">
                        <div className="flex items-center gap-8">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selected === 'estera'}
                                    onChange={() => handleChange('estera')}
                                    name="citizenship"
                                    value="estera"
                                    className="h-4 w-4 cursor-pointer rounded border border-gray-400 accent-gray-700"
                                />
                                <span className="text-sm text-gray-700">Estera</span>
                            </label>

                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selected === 'italiana'}
                                    onChange={() => handleChange('italiana')}
                                    name="citizenship"
                                    value="italiana"
                                    className="h-4 w-4 cursor-pointer rounded border border-gray-400 accent-gray-700"
                                />
                                <span className="text-sm text-gray-700">Italiana</span>
                            </label>
                        </div>
                    </div>
                    <hr className="border-t border-gray-300" />
                    <div className="mx-auto flex w-full justify-end py-5">
                        <button
                            type="submit"
                            className="w-[140px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
                        >
                            Procedi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserInformationForm;
