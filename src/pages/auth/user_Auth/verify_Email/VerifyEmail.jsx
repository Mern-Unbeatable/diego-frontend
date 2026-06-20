import { VerifyEmailForm } from './../../../../components/common/VerifyEmailForm'

const VerifyEmail = () => {
  const handleVerifyEmailSubmit = (otpCode) => {
    console.log('Parent got OTP:', otpCode)
  }
  return (
    <div className="">
      <VerifyEmailForm
        navigatePath="/auth/setUp-userProfile"
        onSubmit={handleVerifyEmailSubmit}
      />
    </div>
  )
}

export default VerifyEmail
