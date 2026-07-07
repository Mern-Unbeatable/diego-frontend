'use client';

import { Search } from 'lucide-react';
import { Container } from '../ui';
import { useTranslation } from 'react-i18next';

export default function CourseFilters({
  searchTerm,
  category,
  duration,
  categories = [],
  durations = [],
  onSearchTermChange,
  onCategoryChange,
  onDurationChange,
  onReset,
}) {
  const { t } = useTranslation();
  return (
    <Container>
      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder={t('trainingPages.section6.searchPlaceholder')}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 outline-none focus:border-[#78c8a7]"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
            />
          </div>

          {/* Category */}
          <select
            className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#78c8a7]"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="">Tutte le Categorie</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Duration */}
          <select
            className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#78c8a7]"
            value={duration}
            onChange={(event) => onDurationChange(event.target.value)}
          >
            <option value="">All Durations</option>
            {durations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Button */}
          <button
            type="button"
            onClick={onReset}
            className="h-12 rounded-xl bg-[#74c6a4] px-8 font-medium text-white transition hover:bg-[#65ba97]"
          >
            Pulisci
          </button>
        </div>
      </div>
    </Container>
  );
}
