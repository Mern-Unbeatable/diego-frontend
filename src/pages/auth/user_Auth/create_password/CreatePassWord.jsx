import CreatePassWordForm from './../../../../components/common/CreatePassWordForm'

const CreatePassWord = () => {
  const handlePasswordSubmit = (data) => {
    console.log('Password form data:', data)
  }

  return (
    <div className="">
      <CreatePassWordForm onSubmitPassword={handlePasswordSubmit} />
    </div>
  )
}

export default CreatePassWord
