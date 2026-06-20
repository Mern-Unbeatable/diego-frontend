import RequestInformationForm from './RequestInformationForm';

function SubmitFormProps() {
  const handleFormSubmit = (data) => {
    console.log('Received form data:', data);
  };

  return (
    <div>
      <RequestInformationForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default SubmitFormProps;

// ========================================
// DIFFERENT PAGE-E USE KORAR EXAMPLE
// ========================================
export function ContactPage() {
  const handleSubmit = (data) => {
    console.log('Contact form:', data);
  };

  return (
    <RequestInformationForm
      title="Contattaci"
      subTitle="Compila il form per contattarci"
      onSubmit={handleSubmit}
    />
  );
}

export function QuotePage() {
  const handleSubmit = (data) => {
    console.log('Quote form:', data);
  };

  return (
    <RequestInformationForm
      title="Richiesta Preventivo"
      subTitle="Richiedi un preventivo gratuito"
      onSubmit={handleSubmit}
    />
  );
}

// Page 3: InfoPage.jsx
export function InfoPage() {
  const handleSubmit = (data) => {
    console.log('Info form:', data);
  };

  return (
    <RequestInformationForm
      title="Richiedi informazioni"
      subTitle="Compila il form per richiedere informazioni"
      onSubmit={handleSubmit}
    />
  );
}
