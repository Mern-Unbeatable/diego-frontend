import DetailsRightSide from './common/DetailsRightSide'
import DetailsLeftSide from './common/DetailsLeftSide'

const DetailsSection = () => {
  return (
    <div className="my-20 grid grid-cols-1 md:grid-cols-2">
      <div className="order-1 col-span-1 md:order-1">
        <DetailsLeftSide />
      </div>
      <div className="order-1 ml-24 md:order-1">
        <DetailsRightSide />
      </div>
    </div>
  )
}

export default DetailsSection
