import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Flight } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import { Button } from './Button';
import { Card } from './Card';

export const FlightCard = ({ flight }: { flight: Flight }) => {
  const navigate = useNavigate();
  const { setSelectedFlight } = useBooking();

  const handleBook = () => {
    setSelectedFlight(flight);
    navigate('/booking');
  };

  return (
    <Card className="space-y-4 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">{flight.airline}</p>
          <p className="text-sm text-slate-500">{flight.flightNumber} • {flight.stops}</p>
          <p className="mt-1 text-sm text-slate-500">{formatDate(flight.departureDate)}</p>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-3 lg:px-6">
          <div>
            <p className="text-sm text-slate-500">Departure</p>
            <p className="text-xl font-bold">{flight.departureTime}</p>
            <p className="text-sm text-slate-500">{flight.from}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Duration</p>
            <p className="text-xl font-bold">{flight.duration}</p>
            <p className="text-sm text-slate-500">Direct comfort journey</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Arrival</p>
            <p className="text-xl font-bold">{flight.arrivalTime}</p>
            <p className="text-sm text-slate-500">{flight.to}</p>
          </div>
        </div>
        <div className="space-y-3 lg:text-right">
          <p className="text-2xl font-bold text-brand-700">{formatCurrency(flight.price)}</p>
          <Button onClick={handleBook}>Book Now</Button>
        </div>
      </div>
    </Card>
  );
};
