import { Heading, Paragraph } from '../ui';

const Banner = ({ image, title, description }) => {
  return (
    <div
      className="relative h-[600px] w-full overflow-hidden rounded-md bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#004731] via-green-800/15 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-10 text-white md:px-20">
        <Heading className="mb-3 max-w-[687px] text-[48px] font-semibold text-white drop-shadow-lg">
          {title}
        </Heading>
        <Paragraph className="max-w-[509px] text-base font-bold text-[#E9E9E9]">
          {description}
        </Paragraph>
      </div>
    </div>
  );
};
export default Banner;
