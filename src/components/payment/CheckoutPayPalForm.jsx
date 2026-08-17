import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useMemo } from 'react';
import { ENV_CONFIG } from '../../config/env.config';
import {
  createCoursePayPalOrderService,
  verifyCoursePayPalOrderService,
} from '../../features/public/payment/paymentService';

const CheckoutPayPalForm = ({
  courseId,
  amount,
  currency = 'EUR',
  disabled = false,
  onSuccess,
  onError,
}) => {
  const paypalClientId = ENV_CONFIG.PAYPAL_CLIENT_ID;

  const options = useMemo(
    () => ({
      clientId: paypalClientId,
      currency,
      intent: 'capture',
    }),
    [paypalClientId, currency],
  );

  if (!paypalClientId) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        PayPal non è configurato. Contatta l&apos;amministratore.
      </p>
    );
  }

  return (
    <PayPalScriptProvider options={options}>
      <div className={disabled ? 'pointer-events-none opacity-60' : ''}>
        <PayPalButtons
          style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
          disabled={disabled}
          forceReRender={[courseId, amount, currency]}
          createOrder={async () => {
            const result = await createCoursePayPalOrderService({
              courseId,
              returnUrl: window.location.href,
              cancelUrl: window.location.href,
            });
            const orderId = result?.data?.orderId || result?.orderId;
            if (!orderId) {
              throw new Error('PayPal orderId missing from server response');
            }
            return orderId;
          }}
          onApprove={async (data) => {
            try {
              const result = await verifyCoursePayPalOrderService(data.orderID);
              onSuccess?.(result?.data || result);
            } catch (error) {
              onError?.(error);
            }
          }}
          onError={(error) => {
            onError?.(error);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default CheckoutPayPalForm;
