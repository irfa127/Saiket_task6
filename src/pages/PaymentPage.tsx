import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BookingSummary } from '../components/BookingSummary';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { useBooking } from '../context/BookingContext';
import { validatePayment } from '../utils/validation';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { selectedFlight, createBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '', upiId: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!selectedFlight) return <Navigate to="/results" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validatePayment(paymentMethod, paymentDetails);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const booking = createBooking(paymentMethod);
    setSubmitting(false);

    if (booking) {
      navigate('/confirmation', { state: { bookingId: booking.id } });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Payment</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Securely complete your booking</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="space-y-5">
            <div className="flex gap-3">
              {[
                { label: 'Credit / Debit Card', value: 'card' },
                { label: 'UPI', value: 'upi' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPaymentMethod(option.value as 'card' | 'upi')}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    paymentMethod === option.value ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Input label="Card Number" placeholder="1234 5678 9012 3456" value={paymentDetails.cardNumber} error={errors.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} />
                </div>
                <Input label="Expiry Date" placeholder="MM/YY" value={paymentDetails.expiryDate} error={errors.expiryDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })} />
                <Input label="CVV" placeholder="123" value={paymentDetails.cvv} error={errors.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} />
              </div>
            ) : (
              <Input label="UPI ID" placeholder="name@bank" value={paymentDetails.upiId} error={errors.upiId} onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })} />
            )}

            <Button type="submit" disabled={submitting}>{submitting ? 'Processing...' : 'Confirm Booking'}</Button>
          </Card>
        </form>

        <BookingSummary />
      </div>
    </div>
  );
};
