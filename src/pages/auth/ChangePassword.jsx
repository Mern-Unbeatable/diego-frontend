import { useState } from "react";
import { Heading, InputField, Label } from "../../components/ui";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.password || !form.confirmPassword) {
            alert("Fill all fields");
            return;
        }

        if (form.password.length < 6) {
            alert("Password too short");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log("New Password:", form.password);

        // next step
        navigate("/auth/register/setup-profile/role");
    };

    return (
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="grid min-h-[650px] grid-cols-1 md:grid-cols-2">

                {/* LEFT */}
                <div className="flex flex-col items-center justify-center bg-white p-10">
                    <div className="flex items-center gap-2">
                        <img
                            className="h-10 w-10 object-contain"
                            src="/images/icons/title.png"
                            alt="Logo"
                        />
                        <h1 className="text-3xl font-bold text-gray-900">
                            UnoSicurezza
                        </h1>
                    </div>

                    <div className="mt-10 max-w-md">
                        <img
                            className="w-full object-contain"
                            src="/image/icon/password.jpg"
                            alt="Password reset"
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center bg-[#F1F9F6] px-8 py-12 lg:px-20">
                    <div className="w-full">



                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* NEW PASSWORD */}
                            <div>
                                <Label className="mb-2 block text-lg font-medium">
                                    Nuova password*
                                </Label>

                                <InputField
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    placeholder="Inserisci la nuova password"
                                    className="rounded-2xl border border-green-100 bg-white px-4 py-3"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <Label className="mb-2 block text-lg font-medium">
                                    Ripeti password*
                                </Label>

                                <InputField
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    placeholder="Conferma la password"
                                    className="rounded-2xl border border-green-100 bg-white px-4 py-3"
                                    onChange={handleChange}
                                />
                            </div>



                            {/* BUTTON */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
                                >
                                    Conferma
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChangePassword;