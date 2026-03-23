import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CLASS_OPTIONS } from '../utils/constants';
import { validateSearchForm } from '../utils/validation';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';

export const SearchForm = () => {
  const navigate = useNavigate();
  const { searchData, setSearchData, resetCurrentFlow } = useBooking();
  const [errors, setErrors] = useState<Partial<Record<keyof typeof searchData, string>>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateSearchForm(searchData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      resetCurrentFlow();
      navigate('/results');
    }
  };

  return (
    <form className="grid gap-4 rounded-3xl bg-white p-5 shadow-soft md:grid-cols-2 xl:grid-cols-6" onSubmit={handleSubmit}>
      <Input label="From" placeholder="New York" value={searchData.from} error={errors.from} onChange={(e) => setSearchData({ ...searchData, from: e.target.value })} />
      <Input label="To" placeholder="Los Angeles" value={searchData.to} error={errors.to} onChange={(e) => setSearchData({ ...searchData, to: e.target.value })} />
      <Input label="Departure" type="date" value={searchData.departureDate} error={errors.departureDate} onChange={(e) => setSearchData({ ...searchData, departureDate: e.target.value })} />
      <Input label="Return" type="date" value={searchData.returnDate} error={errors.returnDate} onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })} />
      <Select
        label="Passengers"
        value={searchData.passengers}
        options={Array.from({ length: 6 }, (_, index) => ({ label: `${index + 1} Passenger${index > 0 ? 's' : ''}`, value: index + 1 }))}
        onChange={(e) => setSearchData({ ...searchData, passengers: Number(e.target.value) })}
      />
      <Select
        label="Class"
        value={searchData.travelClass}
        options={CLASS_OPTIONS.map((option) => ({ label: option, value: option }))}
        onChange={(e) => setSearchData({ ...searchData, travelClass: e.target.value as 'Economy' | 'Business' })}
      />
      <div className="xl:col-span-6">
        <Button type="submit" fullWidth>
          Search Flights
        </Button>
      </div>
    </form>
  );
};
