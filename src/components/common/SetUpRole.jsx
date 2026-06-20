import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Divider } from "../ui";

import icon from "../../../src/assets/images/register/icon.png";
import icon2 from "../../../src/assets/images/register/icon2.png";
import icon3 from "../../../src/assets/images/register/icon3.png";

const roles = [
  { id: "standard", label: "Utente standard - Liv. 1", image: icon },
  { id: "business", label: "Azienda - Liv. 2", image: icon2 },
  { id: "licensed", label: "Utente licenza - Liv. 3", image: icon3 },
];

const RoleCard = ({ label, image, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-2xl border-2 p-4 transition-all h-44 ${isSelected
        ? "border-emerald-400 bg-white shadow-md"
        : "border-gray-200 bg-gray-50 hover:border-gray-300"
        }`}
    >
      <div className="absolute right-3 top-3">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full ${isSelected ? "bg-emerald-400" : "bg-gray-200"
            }`}
        >
          {isSelected && <FaCheckCircle className="h-4 w-4 text-white" />}
        </div>
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-3">
        <img src={image} alt={label} className="h-20 w-ful object-cover" />
        <span className="text-sm font-semibold text-gray-900 text-center">
          {label}
        </span>
      </div>
    </button>
  );
};


const SetUpRole = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState("standard");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectRole?.(selectedRole);
  };

  return (
    <div className="bg-white py-10">
      <form onSubmit={handleSubmit}>
        <div className="px-8">
          <h1 className="text-3xl font-bold text-gray-900">Ruolo</h1>
          <p className="mt-2 text-gray-600">Tu sei un:</p>
        </div>

        <div className="mt-8 px-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              label={role.label}
              image={role.image}
              isSelected={selectedRole === role.id}
              onClick={() => setSelectedRole(role.id)}
            />
          ))}
        </div>

        <Divider className="mt-10" />

        <div className="mt-8 px-8 flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-[#73BFA1] border-2 border-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
          >
            Procedi
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetUpRole;