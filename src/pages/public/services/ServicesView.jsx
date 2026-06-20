import { useEffect, useState } from 'react';
import ServicesCategory from './components/ServicesCategory';
import BannerSection from './sections/BannerSection';
import { getData } from '../../../utils/getData';

const ServicesView = () => {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('category check', categories);

  useEffect(() => {
    const categoryData = async () => {
      try {
        setLoading(true);
        const data = await getData('./fakeData/category.json');
        setCategory(data || []);
      } catch (err) {
        console.error('Error loading categories:', err);
        setCategory([]);
      } finally {
        setLoading(false);
      }
    };
    categoryData();
  }, []);

  return (
    <>
      <BannerSection />
      <ServicesCategory loading={loading} categories={categories} />
    </>
  );
};

export default ServicesView;

