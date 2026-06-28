export const courses = [
  {
    id: 1,
    image: 'images/course/catalog1.png',
    title: 'Formazione SEVESO - pacchetto annuale',
    description:
      "Il corso 'Seveso III' si riferisce alla direttiva UE 2012/18/UE sulla prevenzione degli incidenti rilevanti che comportano sostanze pericolose...",
    oldPrice: '60,00€',
    price: '50,00 €',
  },
  {
    id: 2,
    image: 'images/course/catalog2.png',
    title: 'Datore di lavoro (Nuovo) 16 ore',
    description:
      "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome...",
    oldPrice: '180,00€',
    price: '110,00 €',
  },
  {
    id: 3,
    image: 'images/course/catalog3.png',
    title: 'Generale 4 ore',
    description:
      "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome...",
    oldPrice: '50,00€',
    price: '40,00 €',
  },
  {
    id: 4,
    image: 'images/course/catalog4.png',
    title: 'Specifico basso rischio 4 ore (Nuovo)',
    description:
      "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome...",
    oldPrice: '50,00€',
    price: '40,00 €',
  },
  {
    id: 5,
    image: 'images/course/catalog5.png',
    title: 'Dirigenti 12 ore',
    description:
      "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome...",
    oldPrice: '160,00€',
    price: '120,00 €',
  },
  {
    id: 6,
    image: 'images/course/catalog6.png',
    title: 'Aggiornamento Dirigenti 6 ore',
    description:
      "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome...",
    oldPrice: '50,00€',
    price: '40,00 €',
  },
];

export default function CoursesSection() {
  return (
    <section className="bg-[#f6f6f6] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-[30px] font-semibold text-[#333]">
          Corsi obbligatori
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-xl border border-[#d8e7e2] bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-3 pb-0">
                <img
                  src={course.image}
                  alt=""
                  className="h-[250px] w-full rounded-lg object-cover"
                />
              </div>

              <div className="px-4 py-2">
                <h3 className="mb-2 text-[15px] leading-5 font-semibold text-[#3a3a3a]">
                  {course.title}
                </h3>

                <p className="line-clamp-4 text-[12px] leading-5 text-[#8b8b8b]">
                  {course.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-400 line-through">
                    {course.oldPrice}
                  </span>

                  <span className="text-[20px] font-bold text-[#34b86a]">
                    {course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
