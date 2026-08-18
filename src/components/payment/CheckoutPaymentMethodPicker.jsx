const PayPalMark = () => (
  <svg
    viewBox="0 0 90 32"
    className="h-7 w-[70px] shrink-0 sm:h-9 sm:w-[90px]"
    aria-hidden="true"
  >
    <text
      x="0"
      y="24"
      fontFamily="Helvetica, Arial, sans-serif"
      fontSize="20"
      fontWeight="700"
    >
      <tspan fill="#003087">Pay</tspan>
      <tspan fill="#009CDE">Pal</tspan>
    </text>
  </svg>
);

const HIDDEN_METHOD_IDS = ['google_pay', 'apple_pay'];

const StripeMark = () => (
  <img
    src="/image/paymentIcon/stripe.png"
    alt="Stripe"
    className="h-7 w-auto max-w-[90px] object-contain sm:h-8"
    draggable={false}
  />
);

export default function CheckoutPaymentMethodPicker({
  methods = [],
  selected,
  onSelect,
  seeAllLabel,
  networkLabel,
}) {
  const visibleMethods = (methods || []).filter(
    (method) => !HIDDEN_METHOD_IDS.includes(method?.id),
  );

  // If parent selected a hidden method, fall back to first visible one.
  const effectiveSelected = visibleMethods.some((m) => m.id === selected)
    ? selected
    : visibleMethods[0]?.id ?? selected;

  return (
    <div className="mb-5 w-full min-w-0">
      {networkLabel ? (
        <p className="mb-3 text-sm font-semibold text-gray-800">{networkLabel}</p>
      ) : null}

      <div className="grid min-w-0 w-full grid-cols-2 items-center gap-3">
        {visibleMethods.map((method) => {
          const isActive = effectiveSelected === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              aria-pressed={isActive}
              title={method.label}
              className={`flex min-w-0 w-full appearance-none items-center justify-center border-0 bg-transparent p-0 ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
            >
              {method.id === 'paypal' ? (
                <PayPalMark />
              ) : method.id === 'card' ? (
                <StripeMark />
              ) : (
                <span className="whitespace-nowrap text-base font-semibold text-gray-700">
                  {seeAllLabel || method.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
