import { Container, Heading, Paragraph } from '../../../../components/ui';

const ServicesCategory = ({ categories, loading }) => {
  console.log('Categories in component:', categories);

  return (
    <Container className="my-5 md:my-10 ">
      {loading ? (
        <Heading h2={'Loading'}></Heading>
      ) : (
        <div>
          <Heading className={'mb-10'} h2={'Servizi'}></Heading>
          <div className="flex flex-wrap justify-center gap-[48px]">
            {categories.map((category) => (
              <div
                key={category.id}
                className="w-[calc(50%-24px)] rounded-2xl border border-[#E8E8E8] p-3 md:w-[calc(33.333%-32px)] lg:w-[calc(20%-38.4px)] xl:w-[calc(16.666%-40px)]"
              >
                <div className="mx-auto w-fit">
                  <img
                    className="block h-[132px] w-[132px] rounded-md object-cover"
                    src={category.image}
                    alt={category.title}
                  />
                </div>
                <div className="mx-auto w-fit">
                  <Paragraph
                    p={category.title}
                    className="mt-2 w-[132px] text-center font-bold text-[#202020]"
                  ></Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ServicesCategory;