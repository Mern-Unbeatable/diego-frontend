import { FaArrowRight } from 'react-icons/fa';

const ServiceList = ({ items = [] }) => {
  return (
    <div className="max-w-[586px] rounded-2xl bg-[#F1F9F6] px-[35px] py-5">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 ${index !== 0 ? 'my-4' : ''}`}
        >
          <FaArrowRight className="text-[#284338]" />
          {/* <Paragraoh p={item} /> */}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
