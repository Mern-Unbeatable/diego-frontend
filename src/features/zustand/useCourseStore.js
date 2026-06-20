import { create } from 'zustand';

export const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  fetchCourses: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      set({ courses: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
