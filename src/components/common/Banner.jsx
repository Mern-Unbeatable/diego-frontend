import { Header } from '../ui';

const Banner = ({ image, title, subtitle, description }) => {
  return (
    <div
      className="relative h-[280px] w-full overflow-hidden rounded-b-md bg-cover bg-center sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#004731] via-green-800/15 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-5 text-white sm:px-8 md:px-12 lg:px-20">
        <Header
          title={title}
          subtitle={subtitle}
          description={description}
          level={1}
          titleClassName="mb-3 max-w-[687px] text-[28px] leading-tight font-semibold text-white drop-shadow-lg sm:text-[36px] md:text-[42px] lg:text-[48px]"
          subtitleClassName="mb-1 max-w-[687px] text-sm font-medium text-white drop-shadow-lg sm:text-base md:text-lg "
          descClassName="max-w-4xl text-justify text-sm  font-bold text-[#E9E9E9] sm:text-base"
        />
      </div>
    </div>
  );
};
export default Banner;
