import { Heading, Paragraph } from '../ui';

const Banner = ({ image, title, description }) => {
  return (
    <div
      className="
    relative
    h-[280px]
    sm:h-[350px]
    md:h-[450px]
    lg:h-[550px]
    xl:h-[600px]
    w-full
    overflow-hidden
    rounded-md
    bg-cover
    bg-center
  "
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#004731] via-green-800/15 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-5 text-white sm:px-8 md:px-12 lg:px-20">
        <Heading
          className="
      mb-3
      max-w-[687px]
      text-[28px]
      font-semibold
      leading-tight
      text-white
      drop-shadow-lg

      sm:text-[36px]
      md:text-[42px]
      lg:text-[48px]
      "
        >
          {title}
        </Heading>

        <Paragraph
          className="
      max-w-[509px]
      text-sm
      font-bold
      text-[#E9E9E9]

      sm:text-base
      "
        >
          {description}
        </Paragraph>
      </div>
    </div>
  );
};
export default Banner;
