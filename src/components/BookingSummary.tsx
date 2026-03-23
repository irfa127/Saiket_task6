import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/format';
import { Card } from './Card';

export const BookingSummary = () => {
  const { selectedFlight, searchData, selectedSeat, passenger } = useBooking();

  if (!selectedFlight) return null;

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">Flight Summary</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{selectedFlight.airline} • {selectedFlight.flightNumber}</h3>
      </div>
      <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <p><span className="font-semibold text-slate-900">Route:</span> {selectedFlight.from} → {selectedFlight.to}</p>
        <p><span className="font-semibold text-slate-900">Date:</span> {formatDate(searchData.departureDate || selectedFlight.departureDate)}</p>
        <p><span className="font-semibold text-slate-900">Passenger:</span> {passenger.fullName || 'Pending'}</p>
        <p><span className="font-semibold text-slate-900">Seat:</span> {selectedSeat || 'Select a seat'}</p>
        <p><span className="font-semibold text-slate-900">Class:</span> {searchData.travelClass}</p>
        <p><span className="font-semibold text-slate-900">Fare:</span> {formatCurrency(selectedFlight.price * searchData.passengers)}</p>
      </div>
    </Card>
  );
};
