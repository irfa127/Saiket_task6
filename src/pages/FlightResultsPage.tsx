import { useEffect, useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { FlightCard } from '../components/FlightCard';
import { useBooking } from '../context/BookingContext';
import { searchFlights } from '../services/flightService';
import { Flight } from '../types';
import { getTimeSlot } from '../utils/format';

export const FlightResultsPage = () => {
  const { searchData } = useBooking();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [airline, setAirline] = useState('All');
  const [timeSlot, setTimeSlot] = useState('All');

  useEffect(() => {
    const loadFlights = async () => {
      try {
        setLoading(true);
        setError('');
        const results = await searchFlights(searchData);
        setFlights(results);
      } catch {
        setError('Unable to load flights right now. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    void loadFlights();
  }, [searchData]);

  const airlineOptions = useMemo(() => ['All', ...new Set(flights.map((flight) => flight.airline))], [flights]);

  const filteredFlights = useMemo(
    () =>
      flights.filter((flight) => {
        const withinPrice = flight.price <= maxPrice;
        const matchesAirline = airline === 'All' || flight.airline === airline;
        const matchesSlot = timeSlot === 'All' || getTimeSlot(flight.departureTime) === timeSlot;
        return withinPrice && matchesAirline && matchesSlot;
      }),
    [flights, maxPrice, airline, timeSlot],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Flight Results</p>
        <h1 className="text-3xl font-bold text-slate-900">Available flights from {searchData.from || 'your city'} to {searchData.to || 'your destination'}</h1>
        <p className="text-slate-600">Filter by airline, fare, and preferred time slot to find the best journey.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            <p className="text-sm text-slate-500">Refine your flight results.</p>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Max Price: ${maxPrice}
            <input type="range" min="100" max="500" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Airline
            <select value={airline} onChange={(e) => setAirline(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">
              {airlineOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Time Slot
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">
              {['All', 'Morning', 'Afternoon', 'Evening'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </Card>

        <div className="space-y-5">
          {loading ? (
            <Card><p className="text-slate-600">Loading flights...</p></Card>
          ) : error ? (
            <Card><p className="text-red-500">{error}</p></Card>
          ) : filteredFlights.length === 0 ? (
            <Card><p className="text-slate-600">No flights match your filters. Try adjusting your search.</p></Card>
          ) : (
            filteredFlights.map((flight) => <FlightCard key={flight.id} flight={flight} />)
          )}
        </div>
      </div>
    </div>
  );
};
