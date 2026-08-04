import { useMemo, useState } from 'react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ENV_CONFIG } from '../../config/env.config';
import { formatEuro } from '../../utils/courseMedia';
const stripeElementStyle = {
  base: {
    fontSize: '16px',
    color: '#1f2937',
    fontFamily: 'inherit',
    '::placeholder': {
      color: '#9ca3af',
    },
  },
  invalid: {
    color: '#ef4444',
  },
};

const stripeElementOptions = {
  style: stripeElementStyle,
};

const StripeField = ({ label, children }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
    </label>
    <div className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:outline-none">
      {children}
    </div>
  </div>
);
const CheckoutPaymentFields = ({
  clientSecret,
  amount,
  verifying = false,
  onSuccess,
  submitDisabled = false,
  submitDisabledTitle = '',
}) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');
  const [processing, setProcessing] = useState(false);

  const formattedPrice = formatEuro(amount);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitDisabled) return;
    if (!stripe || !elements) return;

    const trimmedName = cardholderName.trim();
    if (!trimmedName) {
      toast.error(t('paymentPages.section2.nameRequired'));
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      toast.error(t('paymentPages.section2.paymentError'));
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: trimmedName,
            },
          },
        },
      );
      if (error) {
        toast.error(error.message || t('paymentPages.section2.paymentError'));
        return;
      }
      if (paymentIntent?.status === 'succeeded') {
        await onSuccess?.(paymentIntent);
        return;
      }
      if (paymentIntent?.status === 'processing') {
        toast.success(t('paymentPages.section2.processing'));
        await onSuccess?.(paymentIntent);
      }
    } catch (error) {
      console.error('Stripe payment error:', error);
      toast.error(t('paymentPages.section2.paymentError'));
    } finally {
      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StripeField label={t('paymentPages.section2.nameOnCard')}>
        <input
          type="text"
          value={cardholderName}
          onChange={(event) => setCardholderName(event.target.value)}
          placeholder="Franco Rossi"
          disabled={submitDisabled}
          className="w-full bg-white text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </StripeField>

      <StripeField label={t('paymentPages.section2.cardNumber')}>
        <CardNumberElement options={stripeElementOptions} />
      </StripeField>

      <div className="grid grid-cols-2 gap-4">
        <StripeField label={t('paymentPages.section2.expiryDate')}>
          <CardExpiryElement options={stripeElementOptions} />
        </StripeField>
        <StripeField label={t('paymentPages.section2.cvv')}>
          <CardCvcElement options={stripeElementOptions} />
        </StripeField>
      </div>
      <button
        type="submit"
        disabled={submitDisabled || !stripe || processing || verifying}
        title={submitDisabled ? submitDisabledTitle : undefined}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition hover:bg-[#5fa889] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{formattedPrice}</span>
        <span>
          {processing || verifying
            ? t('paymentPages.section2.processing')
            : t('paymentPages.section2.payNow')}
        </span>
        <span>→</span>
      </button>
    </form>
  );
};

const CheckoutPaymentFieldsReadOnly = ({
  amount,
  submitDisabledTitle = '',
}) => {
  const { t } = useTranslation();
  const formattedPrice = formatEuro(amount);

  return (
    <div className="space-y-4">
      <StripeField label={t('paymentPages.section2.nameOnCard')}>
        <input
          type="text"
          disabled
          placeholder="Franco Rossi"
          className="w-full bg-white text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </StripeField>

      <StripeField label={t('paymentPages.section2.cardNumber')}>
        <input
          type="text"
          disabled
          placeholder="1234 1234 1234 1234"
          className="w-full bg-white text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </StripeField>

      <div className="grid grid-cols-2 gap-4">
        <StripeField label={t('paymentPages.section2.expiryDate')}>
          <input
            type="text"
            disabled
            placeholder="MM / YY"
            className="w-full bg-white text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </StripeField>
        <StripeField label={t('paymentPages.section2.cvv')}>
          <input
            type="text"
            disabled
            placeholder="CVC"
            className="w-full bg-white text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </StripeField>
      </div>

      <button
        type="button"
        disabled
        title={submitDisabledTitle}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{formattedPrice}</span>
        <span>{t('paymentPages.section2.payNow')}</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default function CheckoutStripeForm({
  clientSecret,
  publishableKey,
  amount,
  verifying = false,
  onSuccess,
  submitDisabled = false,
  submitDisabledTitle = '',
  readOnly = false,
}) {
  const stripePromise = useMemo(() => {
    const key = publishableKey || ENV_CONFIG.STRIPE_PUBLISHABLE_KEY;
    if (!key) return null;
    return loadStripe(key);
  }, [publishableKey]);

  if (readOnly || (submitDisabled && !clientSecret)) {
    return (
      <CheckoutPaymentFieldsReadOnly
        amount={amount}
        submitDisabledTitle={submitDisabledTitle}
      />
    );
  }

  if (!stripePromise || !clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={{ locale: 'auto' }}>
      <CheckoutPaymentFields
        clientSecret={clientSecret}
        amount={amount}
        verifying={verifying}
        onSuccess={onSuccess}
        submitDisabled={submitDisabled}
        submitDisabledTitle={submitDisabledTitle}
      />
    </Elements>
  );
}
