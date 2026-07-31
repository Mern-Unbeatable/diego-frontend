import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const CourseCard = ({ course, onCardClick, getCategoryClasses }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group flex min-w-0 cursor-pointer flex-col gap-3 overflow-hidden rounded-xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] sm:gap-4 sm:p-4"
      onClick={onCardClick}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-48">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            no image added
          </div>
        )}

        <button
          type="button"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#CCCCCC80] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? (
            <FaHeart className="text-xs text-white" />
          ) : (
            <FaRegHeart className="text-xs text-[#FFFFFF]" />
          )}
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-2 px-0.5 sm:px-1">
        <div className="flex">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${getCategoryClasses(course.category)}`}
          >
            {course.category}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base leading-snug font-medium tracking-tight text-gray-800 sm:text-lg">
          {course.title}
        </h3>

        <div className="my-0.5">
          <div className="h-1.5 w-full rounded-full bg-[#F1F9F6] sm:h-2">
            <div
              className="h-full rounded-full bg-[#73BFA1] transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          {course.totalLessons > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              {course.completedLessons}/{course.totalLessons} lezioni completate
            </p>
          )}
        </div>

        <div className="mt-1 flex flex-col gap-2 sm:mt-2 sm:gap-2.5">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCardClick?.();
            }}
            className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73BFA1] text-sm font-semibold text-white transition hover:bg-[#5daf8f] sm:h-11"
          >
            {course.buttonText}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-[#73BFA1] bg-transparent text-sm font-semibold text-[#73BFA1] transition hover:bg-[#70C1A3]/5 sm:h-11"
          >
            download del report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
