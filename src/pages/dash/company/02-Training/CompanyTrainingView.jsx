import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CalendarDays,
  Mail,
  Pencil,
  Phone,
  Trash2,
  UsersRound,
} from 'lucide-react';
import EmployeeModal from '../EmployeeModal';

const employeesSeed = [
  {
    id: 1,
    name: 'Franco rossi',
    role: 'Safety manager',
    email: 'willie.jennings@example.com',
    phone: '+39 123 456 7890',
    hireDate: '15/03/2022',
    status: 'Attivo',
  },
  {
    id: 2,
    name: 'Franco rossi',
    role: 'Safety manager',
    email: 'michelle.rivera@example.com',
    phone: '+39 123 456 7890',
    hireDate: '15/03/2022',
    status: 'Attivo',
  },
  {
    id: 3,
    name: 'Franco rossi',
    role: 'Safety manager',
    email: 'alma.lawson@example.com',
    phone: '+39 123 456 7890',
    hireDate: '15/03/2022',
    status: 'Attivo',
  },
  {
    id: 4,
    name: 'Franco rossi',
    role: 'Safety manager',
    email: 'curtis.weaver@example.com',
    phone: '+39 123 456 7890',
    hireDate: '15/03/2022',
    status: 'Attivo',
  },
  {
    id: 5,
    name: 'Franco rossi',
    role: 'Safety manager',
    email: 'kenzi.lawson@example.com',
    phone: '+39 123 456 7890',
    hireDate: '15/03/2022',
    status: 'Attivo',
  },
  {
    id: 6,
    name: 'Franco rossi',
    role: 'Safety manager',
    email: 'georgia.young@example.com',
    phone: '+39 123 456 7890',
    hireDate: '15/03/2022',
    status: 'Inattivo',
  },
];

const CompanyTrainingView = () => {
  const [employees, setEmployees] = useState(employeesSeed);
  const [modal, setModal] = useState({
    open: false,
    mode: 'add',
    employee: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('addUser') === '1') {
      setModal({ open: true, mode: 'add', employee: null });
      searchParams.delete('addUser');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const visibleEmployees = useMemo(() => employees.slice(0, 6), [employees]);

  const openAdd = () => setModal({ open: true, mode: 'add', employee: null });
  const openEdit = (employee) =>
    setModal({ open: true, mode: 'edit', employee });
  const closeModal = () =>
    setModal({ open: false, mode: 'add', employee: null });

  const removeEmployee = (id) => {
    setEmployees((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#1f1f1f] md:text-3xl">
          Anagrafica dipendenti
        </h2>
        <button
          type="button"
          onClick={openAdd}
          className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
        >
          + Aggiungi utente
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {visibleEmployees.map((employee) => (
          <article
            key={employee.id}
            className="rounded-xl border border-[#e7e7e7] bg-white p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                  <UsersRound size={18} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-[#808080]">{employee.role}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${employee.status === 'Attivo' ? 'bg-[#edf7f2] text-[#6eb295]' : 'bg-[#fbe9e7] text-[#dd6b5f]'}`}
              >
                {employee.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-[#555555]">
              <p className="flex items-center gap-2">
                <Mail size={15} />
                {employee.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} />
                {employee.phone}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays size={15} />
                Assunzione: {employee.hireDate}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openEdit(employee)}
                className="inline-flex min-w-[122px] items-center justify-center gap-2 rounded-lg border border-[#92d0b7] px-5 py-2 text-sm font-semibold text-[#65ad8d] hover:bg-[#eff9f5]"
              >
                <Pencil size={15} /> Modifica
              </button>
              <button
                type="button"
                onClick={() => removeEmployee(employee.id)}
                className="inline-flex min-w-[122px] items-center justify-center gap-2 rounded-lg border border-[#ef6a59] px-5 py-2 text-sm font-semibold text-[#e14f3f] hover:bg-[#fff3f1]"
              >
                <Trash2 size={15} /> Elimina
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className="flex flex-wrap items-center justify-between border-t border-[#ececec] pt-4 text-sm text-[#7d7d7d]">
        <p>Mostra 6 di 16 corsisti</p>
        <div className="flex items-center gap-4">
          <button type="button">Precedente</button>
          <button
            type="button"
            className="h-6 w-6 rounded bg-[#73bfa1] text-xs font-semibold text-white"
          >
            1
          </button>
          <button type="button">2</button>
          <button type="button">Prossimo</button>
        </div>
      </footer>

      <div className="rounded-xl border border-[#ececec] bg-white px-5 py-4">
        <p className="mb-3 text-sm text-[#666666]">
          Corso assegnato: Formazione SEVESO
        </p>
        <Link
          to="/dashboard/company-admin/gestisci-formazione/corsi/seveso"
          className="inline-flex rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
        >
          Vedi iscritti
        </Link>
      </div>

      {modal.open ? (
        <EmployeeModal
          mode={modal.mode}
          employee={modal.employee}
          onClose={closeModal}
        />
      ) : null}
    </section>
  );
};

export default CompanyTrainingView;
