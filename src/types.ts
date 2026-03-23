export type TravelClass = 'Economy' | 'Business';
export type Gender = 'Male' | 'Female' | 'Other';
export type PaymentMethod = 'card' | 'upi';

export interface SearchFormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  travelClass: TravelClass;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  duration: string;
  price: number;
  stops: string;
}

export interface PassengerDetails {
  fullName: string;
  age: string;
  gender: Gender;
  email: string;
  phone: string;
}

export interface TicketBooking {
  id: string;
  flight: Flight;
  passenger: PassengerDetails;
  seat: string;
  paymentMethod: PaymentMethod;
  bookedAt: string;
  status: 'Confirmed' | 'Cancelled';
}
