"use client";

import { Search, Filter, Clock, X } from "lucide-react";
import { Container } from "../ui";

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
  const hasActiveFilters = Boolean(searchTerm || category || duration);

  return (
    <Container>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm my-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-4 items-end">
          {/* Search */}
          <div>
            <label
              htmlFor="course-search"
              className="block text-xs font-medium text-gray-500 mb-1.5"
            >
              Cerca
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="course-search"
                type="text"
                placeholder="Cerca corsi..."
                className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none focus:border-[#78c8a7] focus:ring-2 focus:ring-[#78c8a7]/20 transition"
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="course-category"
              className="block text-xs font-medium text-gray-500 mb-1.5"
            >
              Categoria
            </label>
            <div className="relative">
              <Filter
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <select
                id="course-category"
                className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none focus:border-[#78c8a7] focus:ring-2 focus:ring-[#78c8a7]/20 transition appearance-none"
                value={category}
                onChange={(event) => onCategoryChange(event.target.value)}
              >
                <option value="">Tutte le categorie</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="course-duration"
              className="block text-xs font-medium text-gray-500 mb-1.5"
            >
              Durata
            </label>
            <div className="relative">
              <Clock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <select
                id="course-duration"
                className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none focus:border-[#78c8a7] focus:ring-2 focus:ring-[#78c8a7]/20 transition appearance-none"
                value={duration}
                onChange={(event) => onDurationChange(event.target.value)}
              >
                <option value="">Tutte le durate</option>
                {durations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Button - only shown when there's something to reset */}
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="h-12 px-6 rounded-xl bg-[#74c6a4] text-white font-medium hover:bg-[#65ba97] transition disabled:opacity-0 disabled:pointer-events-none"
          >
            Pulisci
          </button>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {searchTerm && (
              <FilterChip
                label={`"${searchTerm}"`}
                onRemove={() => onSearchTermChange("")}
              />
            )}
            {category && (
              <FilterChip label={category} onRemove={() => onCategoryChange("")} />
            )}
            {duration && (
              <FilterChip label={duration} onRemove={() => onDurationChange("")} />
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-[#e9f6f0] text-[#3d8266] text-sm font-medium">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Rimuovi filtro ${label}`}
        className="rounded-full hover:bg-[#c9e9db] p-0.5 transition"
      >
        <X size={14} />
      </button>
    </span>
  );
}
