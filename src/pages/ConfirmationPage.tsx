import { useMemo } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/format';

export const ConfirmationPage = () => {
  const location = useLocation();
  const { bookings } = useBooking();

  const bookingId = (location.state as { bookingId?: string } | null)?.bookingId;
  const booking = useMemo(() => bookings.find((item) => item.id === bookingId) ?? bookings[0], [bookings, bookingId]);

  if (!booking) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✓</div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Booking Confirmed</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Your ticket has been booked successfully</h1>
          <p className="mt-3 text-slate-600">A confirmation summary is ready below. You can review all bookings in your profile page.</p>
        </div>

        <div className="grid gap-4 rounded-3xl bg-slate-50 p-6 text-left md:grid-cols-2">
          <p><span className="font-semibold text-slate-900">Booking ID:</span> {booking.id}</p>
          <p><span className="font-semibold text-slate-900">Passenger:</span> {booking.passenger.fullName}</p>
          <p><span className="font-semibold text-slate-900">Airline:</span> {booking.flight.airline}</p>
          <p><span className="font-semibold text-slate-900">Flight:</span> {booking.flight.flightNumber}</p>
          <p><span className="font-semibold text-slate-900">Route:</span> {booking.flight.from} → {booking.flight.to}</p>
          <p><span className="font-semibold text-slate-900">Date:</span> {formatDate(booking.flight.departureDate)}</p>
          <p><span className="font-semibold text-slate-900">Seat:</span> {booking.seat}</p>
          <p><span className="font-semibold text-slate-900">Fare:</span> {formatCurrency(booking.flight.price)}</p>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/profile"><Button>Go to My Bookings</Button></Link>
          <Link to="/"><Button variant="secondary">Book Another Flight</Button></Link>
        </div>
      </Card>
    </div>
  );
};
