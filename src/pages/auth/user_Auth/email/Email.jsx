import EmailForm from '../../../../components/common/EmailForm'

const Email = () => {
  const handleEmailSubmit = (email) => {
    console.log('Email received from EmailForm:', email)
  }

  return (
    <div>
      <EmailForm
        heading="Write your email"
        navigatePath="/auth/password"
        onSubmit={handleEmailSubmit}
      />
    </div>
  )
}

export default Email
