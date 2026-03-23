import { mockFlights } from '../data/mockFlights';
import { Flight, SearchFormData } from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface FlightFilters {
  maxPrice: number;
  airline: string;
  timeSlot: string;
}

export const searchFlights = async (criteria: SearchFormData): Promise<Flight[]> => {
  await wait(800);

  return mockFlights.filter((flight) => {
    const fromMatches = !criteria.from || flight.from.toLowerCase().includes(criteria.from.toLowerCase());
    const toMatches = !criteria.to || flight.to.toLowerCase().includes(criteria.to.toLowerCase());
    return fromMatches && toMatches;
  });
};
