import { PassengerDetails, SearchFormData } from '../types';

export const validateSearchForm = (values: SearchFormData) => {
  const errors: Partial<Record<keyof SearchFormData, string>> = {};

  if (!values.from.trim()) errors.from = 'Departure city is required.';
  if (!values.to.trim()) errors.to = 'Destination city is required.';
  if (!values.departureDate) errors.departureDate = 'Departure date is required.';
  if (values.returnDate && values.returnDate < values.departureDate) {
    errors.returnDate = 'Return date cannot be before departure.';
  }
  if (values.from.trim() && values.to.trim() && values.from.trim().toLowerCase() === values.to.trim().toLowerCase()) {
    errors.to = 'Destination must be different from departure.';
  }

  return errors;
};

export const validatePassengerForm = (values: PassengerDetails) => {
  const errors: Partial<Record<keyof PassengerDetails, string>> = {};

  if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!values.age.trim()) errors.age = 'Age is required.';
  if (values.age && Number(values.age) < 1) errors.age = 'Age must be valid.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.';
  if (!values.phone.trim()) errors.phone = 'Phone number is required.';
  if (values.phone && values.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a valid phone number.';

  return errors;
};

export const validatePayment = (paymentMethod: 'card' | 'upi', paymentDetails: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (paymentMethod === 'card') {
    if (!paymentDetails.cardNumber?.trim()) errors.cardNumber = 'Card number is required.';
    if (!paymentDetails.expiryDate?.trim()) errors.expiryDate = 'Expiry date is required.';
    if (!paymentDetails.cvv?.trim()) errors.cvv = 'CVV is required.';
  }

  if (paymentMethod === 'upi' && !paymentDetails.upiId?.trim()) {
    errors.upiId = 'UPI ID is required.';
  }

  return errors;
};
