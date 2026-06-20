import LeftSide from './common/LeftSide'
import RightSide from './common/RightSide'

const ServiceDetailSection = () => {
  return (
    <div className="my-20 grid grid-cols-1 md:grid-cols-2">
      <div className="order-1 col-span-1 md:order-1">
        <LeftSide />
      </div>
      <div className="order-1 ml-24 md:order-1">
        <RightSide />
      </div>
    </div>
  )
}

export default ServiceDetailSection
