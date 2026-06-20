import ProductCard from '../../../components/common/ProductCard';
import { Button, Container, Grid, Heading, Row } from '../../../components/ui';
const products = [
  {
    id: 1,
    title: 'Modern Web Design Course',
    description:
      'Learn UI/UX and build responsive websites using Tailwind CSS and React.',
    price: 49.99,
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
  },
  {
    id: 2,
    title: 'JavaScript Mastery',
    description:
      'Deep dive into JS fundamentals, ES6+, and modern web techniques.',
    price: 39.99,
    rating: 5,
    image:
      'https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg',
  },
  {
    id: 3,
    title: 'JavaScript Mastery',
    description:
      'Deep dive into JS fundamentals, ES6+, and modern web techniques.',
    price: 39.99,
    rating: 5,
    image:
      'https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg',
  },
  {
    id: 4,
    title: 'JavaScript Mastery',
    description:
      'Deep dive into JS fundamentals, ES6+, and modern web techniques.',
    price: 39.99,
    rating: 5,
    image:
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
  },
  {
    id: 5,
    title: 'JavaScript Mastery',
    description:
      'Deep dive into JS fundamentals, ES6+, and modern web techniques.',
    price: 39.99,
    rating: 5,
    image:
      'https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg',
  },
];

const TeacherView = () => {
  const handleAddToCart = (item) => {
    console.log('Added:', item);
  };

  return (
    <Container size="full" className="py-10">
      <Row justify="between" className="mb-8">
        <Heading
          level={1}
          className="text-2xl font-bold text-gray-800 sm:text-3xl"
        >
          [TEACHER] Product View
        </Heading>
        <Button
          label="Add Course"
          variant="primary"
          size="md"
          className="rounded-md"
        />
      </Row>

      <Grid cols={4} gap="md">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default TeacherView;
