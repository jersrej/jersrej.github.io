/**
 * Full years elapsed since a start year. With a start month (1–12) the count
 * only ticks over once that month comes round; without one it is by calendar year.
 */
export const yearsSince = (since: number, sinceMonth = 1) => {
  const now = new Date();
  const years = now.getFullYear() - since;
  return now.getMonth() + 1 < sinceMonth ? years - 1 : years;
};

// Compact label used next to skills: "<1 yr", "1 yr", "8 yrs"
export const formatYears = (years: number) => {
  if (years < 1) return '<1 yr';
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
};
