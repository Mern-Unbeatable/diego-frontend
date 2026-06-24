import { GrClose } from 'react-icons/gr'
import { H2 } from '../../../../../components/ui/Heading'
import Input from '../../../../../components/ui/Input'

const CompanyInformation = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data)
  }

  return (
    <div className="flex h-auto flex-col bg-white md:h-screen">
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        {/* Header with Steps and Close */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Steps 2/3</p>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <GrClose className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <H2 className={''} h2={'Informazioni'} />
        <form onSubmit={handleFormSubmit} action="">
          <Input
            TClassName={''}
            className={'w-full'}
            name={'company_name'}
            placeholder={'Inserisci il nome completa dell azienda'}
            title={'Ragione sociale *'}
            type={'text'}
          />
          <Input
            TClassName={''}
            className={''}
            name={'office_address'}
            placeholder={'Inserisci lindirizzo della sede legale dell azienda'}
            title={'Indirizzo sede legale *'}
            type={'text'}
          />
          <Input
            TClassName={''}
            className={''}
            name={'number'}
            placeholder={'DE11111'}
            title={'Partita IVA *'}
            type={'number'}
          />
          <Input
            TClassName={''}
            className={''}
            name={'tax_code'}
            placeholder={'987456321'}
            title={'Codice fiscale (se diverso dalla P. IVA) *'}
            type={'number'}
          />
          <Input
            TClassName={''}
            className={''}
            name={'email'}
            placeholder={'example@gmail.com'}
            title={'E-mail di contatto *'}
            type={'text'}
          />
          {/* Footer with Procedi button */}
          <div className="mx-auto flex w-full max-w-3xl justify-end px-6 py-8">
            <button
              type="submit"
              className="w-[140px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
            >
              Procedi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyInformation
