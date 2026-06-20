import { Button, Heading, Image, Paragraph } from '../ui';

const ProductCard = ({
  image,
  title,
  description,
  price,
  rating = 0,
  onAddToCart,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'bg-white border border-gray-200 hover:shadow-lg',
    elevated: 'bg-white shadow-md hover:shadow-xl',
    dark: 'bg-gray-900 text-white border border-gray-700',
  };

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={image} alt={title} rounded="md" className="h-48 md:h-56" />
      </div>

      {/* Product Details */}
      <div className="flex flex-grow flex-col justify-between p-4">
        <Heading level={3} className="mb-1 font-semibold">
          {title}
        </Heading>
        <Paragraph variant="small" className="mb-3 line-clamp-2 text-gray-500">
          {description}
        </Paragraph>

        {/* Rating + Price */}
        <div className="mb-3 flex items-center justify-between">
          ⭐⭐⭐⭐⭐
          <Paragraph className="text-lg font-bold">${price}</Paragraph>
        </div>

        {/* Button */}
        <Button
          label="Add to Cart"
          variant="primary"
          onClick={onAddToCart}
          className="mt-auto w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductCard;
