import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Flight, PassengerDetails, PaymentMethod, SearchFormData, TicketBooking } from '../types';

interface BookingContextValue {
  searchData: SearchFormData;
  selectedFlight: Flight | null;
  passenger: PassengerDetails;
  selectedSeat: string;
  bookings: TicketBooking[];
  setSearchData: (data: SearchFormData) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setPassenger: (passenger: PassengerDetails) => void;
  setSelectedSeat: (seat: string) => void;
  createBooking: (paymentMethod: PaymentMethod) => TicketBooking | null;
  cancelBooking: (bookingId: string) => void;
  resetCurrentFlow: () => void;
}

const defaultSearchData: SearchFormData = {
  from: '',
  to: '',
  departureDate: '',
  returnDate: '',
  passengers: 1,
  travelClass: 'Economy',
};

const defaultPassenger: PassengerDetails = {
  fullName: '',
  age: '',
  gender: 'Male',
  email: '',
  phone: '',
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const BOOKINGS_KEY = 'skybooker-bookings';

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<SearchFormData>(defaultSearchData);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passenger, setPassenger] = useState<PassengerDetails>(defaultPassenger);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [bookings, setBookings] = useState<TicketBooking[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    if (saved) {
      setBookings(JSON.parse(saved) as TicketBooking[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = (paymentMethod: PaymentMethod) => {
    if (!selectedFlight || !selectedSeat) return null;

    const booking: TicketBooking = {
      id: `BK-${Date.now()}`,
      flight: selectedFlight,
      passenger,
      seat: selectedSeat,
      paymentMethod,
      bookedAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setBookings((prev) => [booking, ...prev]);
    return booking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking)));
  };

  const resetCurrentFlow = () => {
    setSelectedFlight(null);
    setPassenger(defaultPassenger);
    setSelectedSeat('');
  };

  const value = useMemo(
    () => ({
      searchData,
      selectedFlight,
      passenger,
      selectedSeat,
      bookings,
      setSearchData,
      setSelectedFlight,
      setPassenger,
      setSelectedSeat,
      createBooking,
      cancelBooking,
      resetCurrentFlow,
    }),
    [searchData, selectedFlight, passenger, selectedSeat, bookings],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
