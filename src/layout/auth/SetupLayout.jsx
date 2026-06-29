import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RiRadioButtonFill } from 'react-icons/ri';
import { PiRadioButtonDuotone } from 'react-icons/pi';

const steps = [
  { label: 'Ruolo', path: 'setup-role' },
  { label: 'Informazioni', path: 'setup-info' },
  { label: 'Password', path: 'setup-password' },
];

const SetupLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = '/auth/register';
  const activeIndex = steps.findIndex((s) =>
    location.pathname.includes(s.path),
  );

  const goToStep = (index) => {
    if (index <= activeIndex + 1) {
      navigate(`${basePath}/${steps[index].path}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-6">
          {/* LEFT */}
          <div className="col-span-2 hidden bg-[#F1F9F6] p-8 lg:flex lg:flex-col">
            <img
              src="/image/icon/droplogo.png"
              className="mx-auto h-20 w-auto"
            />

            <h2 className="mt-6 text-center text-xl font-semibold">
              Imposta il tuo profilo
            </h2>

            <div className="mt-16 flex flex-col gap-10">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const isCompleted = index < activeIndex;

                return (
                  <button
                    key={step.path}
                    onClick={() => goToStep(index)}
                    className="flex items-center gap-4"
                  >
                    <div className="relative flex flex-col items-center">
                      {index !== 0 && (
                        <div className="absolute -top-5 h-5 w-[2px] bg-gray-300" />
                      )}

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                          isActive
                            ? 'bg-[#73BFA1] text-white'
                            : isCompleted
                              ? 'border-[#73BFA1]'
                              : 'border-gray-300'
                        }`}
                      >
                        {isActive ? (
                          <PiRadioButtonDuotone />
                        ) : (
                          <RiRadioButtonFill
                            className={
                              isCompleted ? 'text-[#73BFA1]' : 'text-gray-300'
                            }
                          />
                        )}
                      </div>

                      {index !== steps.length - 1 && (
                        <div className="absolute top-6 h-12 w-[2px] bg-gray-300" />
                      )}
                    </div>

                    <span
                      className={
                        isActive
                          ? 'font-medium text-[#73BFA1]'
                          : 'text-gray-500'
                      }
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-4 h-[700px] overflow-hidden bg-white p-8 hover:overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupLayout;
