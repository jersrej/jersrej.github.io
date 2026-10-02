export const yearsSince = (since: number) => new Date().getFullYear() - since;

// Compact label used next to skills: "<1 yr", "1 yr", "8 yrs"
export const formatYears = (years: number) => {
  if (years < 1) return '<1 yr';
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
};
