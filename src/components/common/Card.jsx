import { IoIosStar } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { IoStopwatchOutline } from 'react-icons/io5';

import Heading from '../ui/typography/Heading';
import Paragraph from '../ui/typography/Paragraph';
import Container from '../ui/layouts/Container';
import Button from '../ui/buttons/Buttons';

const CourseCard = ({ course, isDragging = false }) => {
  const handleButtonClick = (e, action) => {
    // Prevent drag interference
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    e.stopPropagation();
    console.log(`${action} clicked for: ${course.title}`);
  };

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-200 hover:shadow-lg ${
        isDragging ? 'opacity-70' : ''
      }`}
    >
      {/* 🖼️ Image Section */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover"
          draggable={false}
        />

        {course.duration && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1 text-sm shadow-sm backdrop-blur-sm">
            <IoStopwatchOutline className="h-4 w-4 text-gray-700" />
            <span className="font-medium text-gray-700">{course.duration}</span>
          </div>
        )}
      </div>

      {/* 🧾 Content */}
      <div className="flex flex-grow flex-col p-5">
        <Heading className="mb-2 line-clamp-1 text-lg font-semibold text-gray-800">
          {course.title}
        </Heading>

        <Paragraph className="mb-4 line-clamp-3 text-sm text-gray-600">
          {course.description}
        </Paragraph>

        {/* ⭐ Rating + Price */}
        <div className="mt-auto flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {course.rating.toFixed(1)}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IoIosStar
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(course.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({course.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {course.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                €{course.oldPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-[#3FC89E]">
              €{course.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 🧭 Actions */}
        <div className="mt-4 flex gap-3">
          <Button
            label="Iscriviti ora"
            onClick={(e) => handleButtonClick(e, 'Iscriviti ora')}
            className="flex-1 rounded-full font-semibold"
            style={{ backgroundColor: '#3FC89E', color: '#fff' }}
          />
          <Button
            label="Dettagli"
            variant="outline"
            onClick={(e) => handleButtonClick(e, 'Dettagli')}
            className="flex-1 rounded-full border-gray-300 font-semibold text-gray-700 hover:border-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

const CourseCatalog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const carouselRef = useRef(null);

  const courses = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit:crop',
      duration: '08 hr 12 mins',
      title: 'Formazione SEVESO – pacchetto annuale',
      description:
        'corso "Seveso III" si riferisce alla direttiva UE 2012/18/UE sulla prevenzione degli incidenti rilevanti che comportano sostanze pericolo.',
      rating: 4.3,
      reviews: 16325,
      oldPrice: 60.0,
      price: 50.0,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=500&h=300&fit:crop',
      duration: '16 hr 0 mins',
      title: 'Datore di lavoro (Nuovo) 16 ore',
      description:
        "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome di Trento e di Bolzano, finalizzato alla individu...",
      rating: 4.3,
      reviews: 16325,
      oldPrice: 180.0,
      price: 110.0,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit:crop',
      duration: '04 hr 0 mins',
      title: 'Generale 4 ore',
      description:
        "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome di Trento e di Bolzano, finalizzato alla individu...",
      rating: 4.3,
      reviews: 16325,
      oldPrice: 50.0,
      price: 40.0,
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit:crop',
      duration: '12 hr 30 mins',
      title: 'Sicurezza sul lavoro - Corso avanzato',
      description:
        'Corso avanzato sulla sicurezza sul lavoro conforme alle normative vigenti. Include moduli su rischi specifici, gestione emergenze e procedure di sicurezza.',
      rating: 4.5,
      reviews: 12450,
      oldPrice: 120.0,
      price: 95.0,
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit:crop',
      duration: '08 hr 12 mins',
      title: 'Formazione SEVESO – pacchetto annuale',
      description:
        'corso "Seveso III" si riferisce alla direttiva UE 2012/18/UE sulla prevenzione degli incidenti rilevanti che comportano sostanze pericolo.',
      rating: 4.3,
      reviews: 16325,
      oldPrice: 60.0,
      price: 50.0,
    },
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=500&h=300&fit:crop',
      duration: '16 hr 0 mins',
      title: 'Datore di lavoro (Nuovo) 16 ore',
      description:
        "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome di Trento e di Bolzano, finalizzato alla individu...",
      rating: 4.3,
      reviews: 16325,
      oldPrice: 180.0,
      price: 110.0,
    },
    {
      id: 7,
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit:crop',
      duration: '04 hr 0 mins',
      title: 'Generale 4 ore',
      description:
        "Accordo, ai sensi dell'articolo 37, comma 2, del decreto legislativo 9 aprile 2008, n. 81, tra il Governo, le regioni e le Province autonome di Trento e di Bolzano, finalizzato alla individu...",
      rating: 4.3,
      reviews: 16325,
      oldPrice: 50.0,
      price: 40.0,
    },
    {
      id: 8,
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit:crop',
      duration: '12 hr 30 mins',
      title: 'Sicurezza sul lavoro - Corso avanzato',
      description:
        'Corso avanzato sulla sicurezza sul lavoro conforme alle normative vigenti. Include moduli su rischi specifici, gestione emergenze e procedure di sicurezza.',
      rating: 4.5,
      reviews: 12450,
      oldPrice: 120.0,
      price: 95.0,
    },
  ];

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      setItemsPerPage(getItemsPerPage());
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [itemsPerPage]);

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const showPagination = courses.length > itemsPerPage;

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
  const handleDragStart = (e) => {
    if (e.button !== 0 && !e.touches) return;
    setStartX(getClientX(e));
    setIsMoved(false);
    const snapTranslate = -((currentPage * 100) / itemsPerPage);
    setCurrentTranslate(snapTranslate);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (startX === 0) return;
    if (e.touches) {
      e.preventDefault();
    }

    const currentX = getClientX(e);
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 5) {
      setIsMoved(true);
      setIsDragging(true);
    }

    const dragPercentage = (deltaX / carouselRef.current.offsetWidth) * 100;
    const newTranslate = -((currentPage * 100) / itemsPerPage) + dragPercentage;
    setCurrentTranslate(newTranslate);
  };

  const handleDragEnd = () => {
    if (startX === 0) return;

    setStartX(0);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-out';
    }

    const pageTranslate = -((currentPage * 100) / itemsPerPage);
    const dragDistance = currentTranslate - pageTranslate;
    const swipeThreshold = 5;

    let newPage = currentPage;

    if (dragDistance < -swipeThreshold) {
      newPage = Math.min(totalPages - 1, currentPage + 1);
    } else if (dragDistance > swipeThreshold) {
      newPage = Math.max(0, currentPage - 1);
    }

    setCurrentPage(newPage);

    setTimeout(() => {
      setIsMoved(false);
      setIsDragging(false);
    }, 550);
  };

  const finalTranslateValue = isMoved
    ? currentTranslate
    : -((currentPage * 100) / itemsPerPage);

  const transformStyle = `translateX(${finalTranslateValue}%)`;

  const goToPage = (index) => {
    setCurrentPage(index);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-out';
    }
  };

  // --- RENDERING ---
  return (
    <Container size="full" className="">
      <h1 className="mb-8 text-4xl font-bold">
        Esplora il nostro catalogo corsi
      </h1>

      <div className="">
        <div
          className="-m-6 overflow-hidden select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            ref={carouselRef}
            className={`flex ${isMoved ? 'cursor-grabbing' : 'cursor-grab'} ${
              !isMoved || startX === 0
                ? 'transition-transform duration-500 ease-out'
                : ''
            }`}
            style={{
              transform: transformStyle,
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-0"
                style={{
                  minWidth: `${100 / itemsPerPage}%`,
                }}
              >
                <CourseCard course={course} isDragging={isDragging} />
              </div>
            ))}
          </div>
        </div>

        {showPagination && (
          <div className="mt-8 mb-8 flex justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-[#3FC89E]'
                    : 'w-2 bg-[#76c0a2]'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button className="rounded-full border-2 border-[#3FC89E] px-8 py-3 font-semibold text-[#3FC89E] transition-colors hover:bg-green-50">
            Esplora tutti i nostri corsi
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CourseCatalog;
