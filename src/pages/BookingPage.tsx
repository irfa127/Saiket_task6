import { FormEvent, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BookingSummary } from '../components/BookingSummary';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { useBooking } from '../context/BookingContext';
import { GENDER_OPTIONS, RESERVED_SEATS, SEAT_COLUMNS, SEAT_ROWS } from '../utils/constants';
import { validatePassengerForm } from '../utils/validation';

export const BookingPage = () => {
  const navigate = useNavigate();
  const { selectedFlight, passenger, setPassenger, selectedSeat, setSelectedSeat } = useBooking();
  const [errors, setErrors] = useState<Partial<Record<keyof typeof passenger, string>>>({});
  const [seatError, setSeatError] = useState('');

  const seats = useMemo(
    () => Array.from({ length: SEAT_ROWS }, (_, rowIndex) => SEAT_COLUMNS.map((column) => `${rowIndex + 1}${column}`)).flat(),
    [],
  );

  if (!selectedFlight) return <Navigate to="/results" replace />;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validatePassengerForm(passenger);
    setSeatError(selectedSeat ? '' : 'Please choose a seat to continue.');
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && selectedSeat) {
      navigate('/payment');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Passenger Booking</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Complete passenger details and choose your seat</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="grid gap-4 md:grid-cols-2">
            <Input label="Full Name" value={passenger.fullName} error={errors.fullName} onChange={(e) => setPassenger({ ...passenger, fullName: e.target.value })} />
            <Input label="Age" type="number" value={passenger.age} error={errors.age} onChange={(e) => setPassenger({ ...passenger, age: e.target.value })} />
            <Select label="Gender" value={passenger.gender} options={GENDER_OPTIONS.map((gender) => ({ label: gender, value: gender }))} onChange={(e) => setPassenger({ ...passenger, gender: e.target.value as typeof passenger.gender })} />
            <Input label="Email" type="email" value={passenger.email} error={errors.email} onChange={(e) => setPassenger({ ...passenger, email: e.target.value })} />
            <div className="md:col-span-2">
              <Input label="Phone" type="tel" value={passenger.phone} error={errors.phone} onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })} />
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Seat Selection</h2>
              <p className="text-sm text-slate-500">Choose an available seat. Reserved seats are disabled.</p>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {seats.map((seat) => {
                const reserved = RESERVED_SEATS.includes(seat);
                const active = seat === selectedSeat;
                return (
                  <button
                    type="button"
                    key={seat}
                    disabled={reserved}
                    onClick={() => setSelectedSeat(seat)}
                    className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                      reserved
                        ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                        : active
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50'
                    }`}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
            {seatError ? <p className="mt-4 text-sm text-red-500">{seatError}</p> : null}
          </Card>

          <Button type="submit">Continue to Payment</Button>
        </form>

        <div className="space-y-6">
          <BookingSummary />
        </div>
      </div>
    </div>
  );
};
