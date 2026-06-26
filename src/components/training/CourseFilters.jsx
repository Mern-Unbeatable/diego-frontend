"use client";

import { Search } from "lucide-react";
import { Container } from "../ui";
import { useTranslation } from 'react-i18next';

export default function CourseFilters() {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm my-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder={t('trainingPages.filters.searchPlaceholder')}
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none focus:border-[#78c8a7]"
            />
          </div>

          {/* Category */}
          <select className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#78c8a7]">
            <option>{t('trainingPages.filters.allCategories')}</option>
            <option>{t('trainingPages.filters.categorySafety')}</option>
            <option>{t('trainingPages.filters.categoryManagers')}</option>
            <option>{t('trainingPages.filters.categoryGeneral')}</option>
            <option>SEVESO</option>
          </select>

          {/* Duration */}
          <select className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#78c8a7]">
            <option>{t('trainingPages.filters.allDurations')}</option>
            <option>{t('trainingPages.filters.hours4')}</option>
            <option>{t('trainingPages.filters.hours6')}</option>
            <option>{t('trainingPages.filters.hours12')}</option>
            <option>{t('trainingPages.filters.hours16')}</option>
          </select>

          {/* Button */}
          <button className="h-12 px-8 rounded-xl bg-[#74c6a4] text-white font-medium hover:bg-[#65ba97] transition">
            {t('trainingPages.filters.searchButton')}
          </button>
        </div>
      </div>
    </Container>
  );
}