import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/format';

export const ProfilePage = () => {
  const { bookings, cancelBooking } = useBooking();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">My Bookings</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage all your upcoming and past tickets</h1>
      </div>

      <div className="space-y-5">
        {bookings.length === 0 ? (
          <Card><p className="text-slate-600">No bookings yet. Search flights to get started.</p></Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">{booking.flight.airline} • {booking.flight.flightNumber}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Booked on {formatDate(booking.bookedAt)}</p>
                </div>
                <div className="text-sm text-slate-600 lg:text-right">
                  <p className="font-semibold text-brand-700">{formatCurrency(booking.flight.price)}</p>
                  <p>Seat {booking.seat}</p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
                <p><span className="font-semibold text-slate-900">Passenger:</span> {booking.passenger.fullName}</p>
                <p><span className="font-semibold text-slate-900">Route:</span> {booking.flight.from} → {booking.flight.to}</p>
                <p><span className="font-semibold text-slate-900">Departure:</span> {formatDate(booking.flight.departureDate)}</p>
                <p><span className="font-semibold text-slate-900">Payment:</span> {booking.paymentMethod.toUpperCase()}</p>
              </div>
              {booking.status === 'Confirmed' ? (
                <Button variant="secondary" onClick={() => cancelBooking(booking.id)}>Cancel Booking</Button>
              ) : null}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
