import { findSeasonByYear } from '../modules/seasons/services';

export const isSeasonYearValid = async (year: string) => {
  const existingSeason = await findSeasonByYear(year);
  if (!existingSeason) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  if (Number(year) > currentYear || Number(year) < 1950) {
    return false;
  }

  return true;
};
