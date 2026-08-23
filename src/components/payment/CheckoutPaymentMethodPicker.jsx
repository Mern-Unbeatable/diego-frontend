const METHOD_ICONS = {
  google_pay: {
    src: '/image/paymentIcon/gpay-light.png',
    alt: 'Google Pay',
  },
  card: {
    src: '/image/paymentIcon/stripe-light.png',
    alt: 'Stripe',
  },
  paypal: {
    src: '/image/paymentIcon/paypal.png',
    alt: 'PayPal',
  },
};

const ApplePayMark = ({ className = '' }) => (
  <svg
    viewBox="0 0 50 20"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#111111"
      d="M9.2 3.1c-.55.66-1.45 1.17-2.33 1.1-.1-.9.33-1.86.85-2.46C8.28 1.06 9.25.55 10.05.5c.12.93-.27 1.86-.85 2.6zM10.05 4.45c-1.25-.07-2.31.72-2.9.72-.6 0-1.52-.69-2.5-.67-1.29.02-2.47.75-3.13 1.91-1.34 2.32-.34 5.76 1.05 7.65.66.91 1.45 1.93 2.5 1.89 1-.04 1.38-.65 2.59-.65 1.2 0 1.55.65 2.6.63 1.08-.02 1.76-.9 2.41-1.82.76-1.08 1.07-2.13 1.09-2.18-.02 0-2.08-.8-2.1-3.17-.02-1.99 1.62-2.94 1.7-3-.95-1.41-2.43-1.56-2.95-1.58z"
    />
    <text
      x="16.5"
      y="15.2"
      fill="#111111"
      fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
      fontSize="12.5"
      fontWeight="600"
    >
      Pay
    </text>
  </svg>
);

export default function CheckoutPaymentMethodPicker({
  methods = [],
  selected,
  onSelect,
  networkLabel,
}) {
  const visibleMethods = methods || [];

  const effectiveSelected = visibleMethods.some((m) => m.id === selected)
    ? selected
    : visibleMethods[0]?.id ?? selected;

  return (
    <div className="mb-3 w-full min-w-0 sm:mb-4">
      {networkLabel ? (
        <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-gray-600 sm:mb-2 sm:text-xs">
          {networkLabel}
        </p>
      ) : null}

      <div
        role="radiogroup"
        aria-label={networkLabel || 'Payment methods'}
        className="flex w-full min-w-0 flex-wrap items-center gap-1.5"
      >
        {visibleMethods.map((method) => {
          const isActive = effectiveSelected === method.id;
          const icon = METHOD_ICONS[method.id];
          const isApple = method.id === 'apple_pay';

          return (
            <button
              key={method.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={method.label}
              title={method.label}
              onClick={() => onSelect(method.id)}
              className={`relative inline-flex h-7 shrink-0 items-center justify-center rounded-md border bg-transparent px-1.5 transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#73BFA1] sm:h-8 sm:px-2 ${
                isActive
                  ? 'border-[#73BFA1] bg-white/80 shadow-[0_0_0_1.5px_rgba(115,191,161,0.45)]'
                  : 'border-transparent hover:border-gray-300 hover:bg-white/60'
              }`}
            >
              {isApple ? (
                <ApplePayMark className="h-3 w-[40px] sm:h-3.5 sm:w-[46px]" />
              ) : icon ? (
                <img
                  src={icon.src}
                  alt={icon.alt}
                  draggable={false}
                  className="h-3 w-auto max-w-[58px] object-contain object-center sm:h-3.5 sm:max-w-[68px]"
                />
              ) : (
                <span className="text-[10px] font-semibold text-gray-700 sm:text-[11px]">
                  {method.label}
                </span>
              )}

              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#73BFA1] text-[7px] font-bold leading-none text-white sm:h-3.5 sm:w-3.5 sm:text-[8px]"
                >
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
