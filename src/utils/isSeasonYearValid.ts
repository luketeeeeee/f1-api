export const isSeasonYearValid = (year: string | number) => {
  const currentYear = new Date().getFullYear();

  if (Number(year) > currentYear || Number(year) < 1950) {
    return false;
  }

  return true;
};
