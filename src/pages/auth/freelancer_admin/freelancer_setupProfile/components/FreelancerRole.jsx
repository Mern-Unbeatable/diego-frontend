import SetUpRole from '../../../../../components/common/SetUpRole'

const FreelancerRole = () => {
  const handleRoleSelect = (role) => {
    console.log('Freelancer Role selected :', role)
  }

  return (
    <div className="">
      <SetUpRole onSelectRole={handleRoleSelect} />
    </div>
  )
}

export default FreelancerRole
