"use client";

import { Search } from "lucide-react";
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
              placeholder="Cerca corsi..."
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none focus:border-[#78c8a7]"
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
            className="h-12 px-8 rounded-xl bg-[#74c6a4] text-white font-medium hover:bg-[#65ba97] transition"
          >
            Pulisci
          </button>
        </div>
      </div>
    </Container>
  );
}