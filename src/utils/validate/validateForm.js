export const validateForm = () => {
  const newErrors = {};

  if (!form.name.trim()) {
    newErrors.name = 'Il nome è obbligatorio';
  }

  if (!form.surname.trim()) {
    newErrors.surname = 'Il cognome è obbligatorio';
  }

  if (!form.email.trim()) {
    newErrors.email = "L'email è obbligatoria";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Inserisci un indirizzo email valido';
  }

  if (!form.phone.trim()) {
    newErrors.phone = 'Il telefono è obbligatorio';
  } else if (!/^[\d\s+()-]{8,15}$/.test(form.phone)) {
    newErrors.phone = 'Inserisci un numero di telefono valido';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
