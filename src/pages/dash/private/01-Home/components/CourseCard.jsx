import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const CourseCard = ({ course, onCardClick, getCategoryClasses }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] flex flex-col gap-4"
      onClick={onCardClick}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/400x300?text=Course+Image';
          }}
        />
        <button
          type="button"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#CCCCCC80] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? (
            <FaHeart className="text-white text-xs" />
          ) : (
            <FaRegHeart className="text-[#FFFFFF] text-xs" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2 px-1">
        <div className="flex">
          <span
            className={`rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${getCategoryClasses(course.category)}`}
          >
            {course.category}
          </span>
        </div>

        <h3 className="text-lg font-medium text-gray-800 tracking-tight leading-snug">
          {course.title}
        </h3>

        <div className="my-0.5">
          <div className="h-2 w-full rounded-full bg-[#F1F9F6]">
            <div
              className="h-2 rounded-full bg-[#73BFA1] transition-all"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          <button
            type="button"
            className="w-full rounded-full bg-[#73BFA1] py-3.5 font-semibold text-white transition hover:bg-[#5daf8f]"
          >
            {course.buttonText}
          </button>

          <button
            type="button"
            className="w-full rounded-full border border-[#73BFA1] bg-transparent py-3.5 font-semibold text-[#73BFA1] transition hover:bg-[#70C1A3]/5"
          >
            download del report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
