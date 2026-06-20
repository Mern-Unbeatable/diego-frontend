import SignUpPassword from '../../../../../components/common/SignUpPassword'

const FreelancerPassword = () => {
  const handlePasswordSubmit = (data) => {
    console.log('Freelancer Password form data:', data)
  }

  return (
    <div className="">
      <SignUpPassword onSubmitPassword={handlePasswordSubmit} />
    </div>
  )
}

export default FreelancerPassword
