import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      isOpen: true,
      activeLink: '',
      isToggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setActiveLink: (path) => set({ activeLink: path }),
    }),
    { name: 'ui-storage' },
  ),
);

export const useValidationStore = create(
  persist(
    (set) => ({
      validations: {},
      setValidation: (field, message) =>
        set((state) => ({
          validations: {
            ...state.validations,
            [field]: message,
          },
        })),
      clearValidation: (field) =>
        set((state) => {
          const newValidations = { ...state.validations };
          delete newValidations[field];
          return { validations: newValidations };
        }),
    }),
    { name: 'validation-storage' },
  ),
);
