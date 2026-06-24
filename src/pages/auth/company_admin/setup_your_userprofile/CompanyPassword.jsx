import SignUpPassword from '../../../../components/common/SignUpPassword';

const CompanyPassword = () => {
  const handlePasswordSubmit = (data) => {
    console.log('Company Password form data:', data);
  };

  return (
    <div className="">
      <SignUpPassword onSubmitPassword={handlePasswordSubmit} />
    </div>
  );
};

export default CompanyPassword;
