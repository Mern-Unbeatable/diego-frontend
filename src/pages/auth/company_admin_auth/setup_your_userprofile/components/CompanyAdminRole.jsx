import SetUpRole from '../../../../../components/common/SetUpRole'

const CompanyAdminRole = () => {
  const handleRoleSelect = (role) => {
    console.log('Company Admin Role selected :', role)
  }

  return (
    <div className="">
      <SetUpRole onSelectRole={handleRoleSelect} />
    </div>
  )
}

export default CompanyAdminRole
