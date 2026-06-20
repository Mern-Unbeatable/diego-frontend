import FormWrapper from '../forms/FormWrapper';
import Button from '../buttons/Buttons';

const FormModal = ({ isOpen, onClose, onSubmit, title = 'Form', children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        <FormWrapper onSubmit={onSubmit}>
          {children}
          <div className="mt-4 flex justify-end gap-3">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default FormModal;
