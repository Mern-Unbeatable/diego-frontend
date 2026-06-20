import PassWordForm from '../../../../components/common/PassWordForm';

const CreatePassword = () => {
  const handlePassWordSubmit = (PassWord) => {
    console.log('PassWord received from PassWord Form:', PassWord);
  };

  return (
    <div>
      <PassWordForm
        heading="Write your PassWord"
        // navigatePath="/auth/verify-email"
        onSubmit={handlePassWordSubmit}
      />
    </div>
  );
};

export default CreatePassword;
