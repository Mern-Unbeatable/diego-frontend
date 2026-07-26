export const FORM_VARIANTS = {
  dashboard: {
    input:
      'w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none',
    select:
      'w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-all duration-200 hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none',
    label: 'mb-3 block text-sm font-semibold text-gray-700',
    error: 'mt-2 text-xs text-red-500',
    helper: 'mt-2 text-xs text-gray-500',
  },
  course: {
    input:
      'w-full rounded-xl bg-[#dfe8e4] px-4 py-3 text-sm text-[#222] placeholder:text-[#87938f] focus:outline-none',
    select:
      'w-full appearance-none rounded-xl bg-[#dfe8e4] px-4 py-3 pr-10 text-sm text-[#4a4a4a] focus:outline-none',
    label: 'mb-1.5 block text-[13px] font-medium text-[#222]',
    error: 'mt-1 text-xs text-[#d35237]',
    helper: 'mt-1 text-xs text-[#5f6764]',
  },
  ticket: {
    input:
      'w-full rounded-lg border border-transparent bg-[#edf6f2] px-4 text-sm text-[#1f1f1f] placeholder:text-[#9aa8a4] focus:border-[#73bfa1] focus:outline-none',
    select:
      'w-full rounded-lg border border-transparent bg-[#edf6f2] px-4 text-sm text-[#1f1f1f] focus:border-[#73bfa1] focus:outline-none',
    label: 'mb-1.5 block text-lg font-medium text-[#1f1f1f]',
    error: 'mt-1 text-xs text-[#e04f3e]',
    helper: 'mt-1 text-xs text-[#7f7f7f]',
  },
  employee: {
    input:
      'h-12 w-full rounded-lg border border-transparent bg-[#edf5f2] px-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1] disabled:cursor-not-allowed disabled:opacity-70',
    select:
      'h-12 w-full appearance-none rounded-lg border border-transparent bg-[#edf5f2] px-4 pr-10 text-sm text-[#2f2f2f] outline-none focus:border-[#73bfa1] disabled:cursor-not-allowed disabled:opacity-70',
    label: 'mb-1.5 block text-sm font-medium text-[#222222]',
    error: 'mt-1 text-xs text-[#e34f4f]',
    helper: 'mt-1 text-xs text-[#808080]',
  },
};

export const getVariantClasses = (variant = 'dashboard') =>
  FORM_VARIANTS[variant] || FORM_VARIANTS.dashboard;
