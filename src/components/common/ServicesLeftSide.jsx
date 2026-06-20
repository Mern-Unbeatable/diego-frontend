import { FaArrowRight } from 'react-icons/fa';
import { H2, H4 } from '../ui/Heading';
import { P } from '../ui/P';

const ServicesLeftSide = ({
  title = 'Dettagli del servizio',
  paragraphs = [],
  includeTitle = 'Cosa include il servizio',
  includeItems = [],
}) => {
  return (
    <div>
      <H2 h2={title} />

      {/* Render paragraphs dynamically */}
      {paragraphs.map((text, index) => (
        <P
          key={index}
          className={`max-w-[586px] ${index === 0 ? 'mt-4' : 'my-2'}`}
          p={text}
        />
      ))}

      <H4 className={'my-6'} h4={includeTitle} />

      {/* Service list */}
      <div className="max-w-[586px] rounded-2xl bg-[#F1F9F6] px-[35px] py-5">
        {includeItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${index !== 0 ? 'my-4' : ''}`}
          >
            <FaArrowRight className="text-[#284338]" />
            <P p={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesLeftSide;
