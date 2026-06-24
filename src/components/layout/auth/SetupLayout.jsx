import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiRadioButtonFill } from "react-icons/ri";
import { PiRadioButtonDuotone } from "react-icons/pi";

const steps = [
  { label: "Ruolo", path: "role" },
  { label: "Informazioni", path: "information" },
  { label: "Password", path: "password" },
];

const basePath = "/auth/register/setup-profile";

const SetupLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeIndex = steps.findIndex((s) =>
    location.pathname.includes(s.path)
  );

  const goToStep = (index) => {
    if (index <= activeIndex + 1) {
      navigate(`${basePath}/${steps[index].path}`);
    }
  };

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-6">

        {/* LEFT */}
        <div className="col-span-2 bg-[#F1F9F6] p-8">
          <img
            src="/image/icon/droplogo.png"
            className="h-20 w-auto mx-auto"
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
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${isActive
                          ? "bg-[#73BFA1] text-white"
                          : isCompleted
                            ? "border-[#73BFA1]"
                            : "border-gray-300"
                        }`}
                    >
                      {isActive ? (
                        <PiRadioButtonDuotone />
                      ) : (
                        <RiRadioButtonFill
                          className={
                            isCompleted ? "text-[#73BFA1]" : "text-gray-300"
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
                        ? "text-[#73BFA1] font-medium"
                        : "text-gray-500"
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
        <div className="col-span-4 bg-white p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SetupLayout;