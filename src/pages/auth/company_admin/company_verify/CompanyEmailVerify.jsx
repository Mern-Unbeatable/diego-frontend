import { VerifyEmailForm } from '../../../../components/common/VerifyEmailForm';

const CompanyEmailVerify = () => {
  const handleVerifyEmailSubmit = (otpCode) => {
    console.log('Parent got OTP:', otpCode);
  };

  return (
    <div>
      <VerifyEmailForm onSubmit={handleVerifyEmailSubmit} />
    </div>
  );
};

export default CompanyEmailVerify;
